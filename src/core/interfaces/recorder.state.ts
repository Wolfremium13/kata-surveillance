import { VideoRecorder } from "./video.recorder";

export interface RecorderState {
    handle(recorder: VideoRecorder): void;
}