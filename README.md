# 📷 kata-survilleance

**Motion Sensor and Video Recorder Interface**

The motion sensor has an API with a single method that returns true when it detects something has started moving and false when it does not detect any movement. On the other hand, the recorder has two commands: one to start recording and another to stop recording.

Our task will be to design a controller that checks every second if the sensor is detecting motion and if so, instructs the recorder to start recording. Conversely, if no motion is detected, the recording should be stopped. The recording should also stop in case of any unexpected behavior of the sensor.

The main limitation is that the manufacturer does not allow us to access the code of either the sensor or the recorder, seemingly to protect their innovative idea. However, they do provide us with their public interfaces:

```typescript
interface MotionSensor {
  isDetectingMotion(): boolean;
}

interface VideoRecorder {
  startRecording(): void;
  stopRecording(): void;
}
```

These interfaces are all we need, as the idea is to use doubles of these components to test our controller.

**Requirements**

In summary, the requirements that the controller we need to design must meet are:

- Instruct the recorder to stop recording when the sensor does not detect motion.
- Instruct the recorder to start recording when the sensor detects motion.
- Instruct the recorder to stop recording when the sensor throws an unexpected error.
- Check the status of the motion sensor once per second.
