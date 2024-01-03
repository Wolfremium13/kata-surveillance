import { RecorderState } from '../interfaces/recorder.state';
import { VideoRecorder } from '../interfaces/video.recorder';

export class NoMotionState implements RecorderState {
	handle(recorder: VideoRecorder): void {
		recorder.stopRecording();
	}
}
