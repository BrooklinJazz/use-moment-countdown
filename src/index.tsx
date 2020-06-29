// @ts-expect-error
import React, { useState, useEffect, useRef, useCallback } from "react";

import moment, { Moment } from "moment";
import { useInterval } from "./useInterval";
import {
  CountdownInput,
  CountdownConfig,
  CountdownReturnValues,
} from "./types";

export const useCountdown = (
  input: CountdownInput = {},
  config: CountdownConfig = {}
): CountdownReturnValues => {
  const { m = 0, s = 0, h = 0 } = input;
  const { onDone = () => true, recurring } = config;
  const timerDurationInMs = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;

  // timers are tied to re-render unfortunately in react native.
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  useInterval(() => forceUpdate(), 1000);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const [endTime, setEndTime] = useState<Moment>();

  const remainingDurationInMs = endTime && Math.max(endTime.diff(moment()), 0);

  const pausedRemainingDurationInMs = useRef<number | undefined>(
    timerDurationInMs
  );

  const startOrUnpause = () => started && paused ? unPause() : start()

  const start = () => {
    setStarted(true);
    setEndTime(moment().add(timerDurationInMs, "milliseconds"));
  };

  const unPause = () => {
    setPaused(false)
    setEndTime(moment().add(pausedRemainingDurationInMs.current, "milliseconds"))
  }

  const stop = () => {
    pausedRemainingDurationInMs.current = remainingDurationInMs;
    setPaused(true);
  };
  const reset = () => {
    setEndTime(moment().add(timerDurationInMs, "milliseconds"));
  };

  useEffect(() => {
    if (recurring && remainingDurationInMs === 0) {
      onDone();
      reset();
    } else if (remainingDurationInMs === 0) {
      onDone();
      stop();
    }
  }, [remainingDurationInMs]);

  const time = () => {
    if (started && paused && pausedRemainingDurationInMs.current) {
      return moment.utc(pausedRemainingDurationInMs.current);
    } else if (started) {
      return moment.utc(remainingDurationInMs);
    } else {
      return moment.utc(timerDurationInMs);
    }
  };

  return {
    time: time(),
    start: startOrUnpause,
    stop,
    started,
    paused,
    reset,
  };
};
