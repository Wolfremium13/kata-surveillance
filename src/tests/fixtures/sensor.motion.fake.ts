import { MotionSensor } from '../../core/interfaces/motion.sensor';

export class FakeSensorWithNoMotion implements MotionSensor {
	isDetectingMotion(): boolean {
		return false;
	}
}

export class FakeSensorWithMotion implements MotionSensor {
	isDetectingMotion(): boolean {
		return true;
	}
}
