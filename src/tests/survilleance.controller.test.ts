import { describe, expect, it, beforeEach, vi } from 'vitest';
import { MotionSensor } from '../core/interfaces/motion.sensor';
import { VideoRecorder } from '../core/interfaces/video.recorder';
import { SurveillanceController } from '../core/surveillance.controller';
import { FakeSensorWithMotion, FakeSensorWithNoMotion } from './fixtures/sensor.motion.fake';
import { FakeRecorder } from './fixtures/video.recorder.fake';

describe('The surveillance controller should', () => {
	let sensor: MotionSensor;
	let recorder: VideoRecorder;
	let controller: SurveillanceController;

	describe('when there is no motion', () => {
		beforeEach(() => {
			sensor = new FakeSensorWithNoMotion();
			recorder = new FakeRecorder();
			controller = new SurveillanceController(sensor, recorder);
		});

		it('stop recording', () => {
			const spyRecorder = vi.spyOn(recorder, 'stopRecording');

			controller.monitor();

			expect(spyRecorder).toHaveBeenCalled();
		});

		it('stop recording when the sensor throws an unexpected error', () => {
			const stubSensor = vi.spyOn(sensor, 'isDetectingMotion');
			stubSensor.mockImplementation(() => {
				throw new Error('Unexpected Error');
			});
			const spyRecorder = vi.spyOn(recorder, 'stopRecording');

			controller.monitor();

			expect(spyRecorder).toHaveBeenCalled();
		});

		it('checks the sensor status once per second', () => {
			const spySensor = vi.spyOn(sensor, 'isDetectingMotion');
			const numberOfSeconds = 2;

			controller.monitor(numberOfSeconds);

			expect(spySensor).toHaveBeenCalledTimes(numberOfSeconds);
		});
	});

	describe('when there is motion', () => {
		beforeEach(() => {
			sensor = new FakeSensorWithMotion();
			recorder = new FakeRecorder();
			controller = new SurveillanceController(sensor, recorder);
		});

		it('start recording', () => {
			const spyRecorder = vi.spyOn(recorder, 'startRecording');

			controller.monitor();

			expect(spyRecorder).toHaveBeenCalled();
		});

		it('not allow recording when its already recording', () => {
			const spyRecorder = vi.spyOn(recorder, 'startRecording');

			controller.monitor();
			controller.monitor();

			expect(spyRecorder).toHaveBeenCalledTimes(1);
		});
		it('checks the sensor status once per second', () => {
			const spySensor = vi.spyOn(sensor, 'isDetectingMotion');
			const numberOfSeconds = 2;

			controller.monitor(numberOfSeconds);

			expect(spySensor).toHaveBeenCalledTimes(numberOfSeconds);
		});
	});
});
