import { RecorderState } from '../interfaces/recorder.state';
import { VideoRecorder } from '../interfaces/video.recorder';

export class IdleState implements RecorderState {
	handle(recorder: VideoRecorder): void {}
}
