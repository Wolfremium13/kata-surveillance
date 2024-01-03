import { MotionSensor } from './interfaces/motion.sensor';
import { RecorderState } from './interfaces/recorder.state';
import { VideoRecorder } from './interfaces/video.recorder';
import { IdleState } from './states/idle';
import { MotionDetectedState } from './states/motion.detected';
import { NoMotionState } from './states/no.motion.detected';
import { RecorderStateFactory } from './states/recorder.state.factory';

export class SurveillanceController {
	private sensor: MotionSensor;
	private recorder: VideoRecorder;
	private currentState: RecorderState;

	constructor(sensor: MotionSensor, recorder: VideoRecorder) {
		this.sensor = sensor;
		this.recorder = recorder;
		this.currentState = new IdleState();
	}

	public monitor(numberOfSeconds: number = 1): void {
		this.range(numberOfSeconds).forEach(() => {
			this.checkMotion();
			this.waitOneSecond();
		});
	}

	private checkMotion() {
		try {
			this.updateStateBasedOnMotion();
		} catch (error) {
			this.handleUnexpectedError(error);
		}
	}

	private updateStateBasedOnMotion() {
		const isMotionDetected = this.sensor.isDetectingMotion();
		const newState = RecorderStateFactory.fromMotion(isMotionDetected);
		this.changeState(newState);
	}

	private handleUnexpectedError(error: Error) {
		console.error(error.message);
		this.recorder.stopRecording();
	}

	private changeState(newState: RecorderState) {
		if (this.currentState.constructor !== newState.constructor) {
			this.currentState = newState;
			this.currentState.handle(this.recorder);
		}
	}

	private range(length: number): number[] {
		return Array.from({ length }, (_, i) => i);
	}

	private waitOneSecond() {
		const aSecond = 1000;
		let startTime = new Date().getTime();
		const endTime = startTime + aSecond;
		while (startTime < endTime) {
			startTime = new Date().getTime();
		}
	}
}
