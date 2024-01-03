import { VideoRecorder } from '../../core/interfaces/video.recorder';

export class FakeRecorder implements VideoRecorder {
	startRecording(): void {}

	stopRecording(): void {}
}
