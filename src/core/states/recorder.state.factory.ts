import { RecorderState } from "../interfaces/recorder.state";
import { MotionDetectedState } from "./motion.detected";
import { NoMotionState } from "./no.motion.detected";

export class RecorderStateFactory {

    static fromMotion(isMotionDetected: boolean): RecorderState {
        return isMotionDetected ? new MotionDetectedState() : new NoMotionState();
    }
}