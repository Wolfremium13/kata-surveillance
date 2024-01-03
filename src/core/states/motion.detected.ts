import { RecorderState } from "../interfaces/recorder.state";
import { VideoRecorder } from "../interfaces/video.recorder";

export class MotionDetectedState implements RecorderState {
    handle(recorder: VideoRecorder): void {
        recorder.startRecording();
      }
}