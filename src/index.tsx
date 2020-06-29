import React, { useState, useEffect } from "react";

import moment, { Moment } from "moment";
import { useInterval } from "./useInterval";
import { CountdownInput, CountdownConfig, CountdownReturnValues } from "./types";

export const useCountdown = (
  input: CountdownInput = {},
  config: CountdownConfig = {}
): CountdownReturnValues => {
  const { m = 0, s = 0, h = 0 } = input;
  const { onDone = () => true, recurring } = config;
  const timerDurationInMs = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;

  // timers are tied to re-render unfortunately in react native.
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  useInterval(() => forceUpdate(), 1000);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const [endTime, setEndTime] = useState<Moment>();

  const remainingDurationInMs = endTime && Math.max(endTime.diff(moment()), 0);

  const start = () => {
    setStarted(true);
    setPaused(false);
    setEndTime(moment().add(timerDurationInMs, "milliseconds"));
  };
  const stop = () => {
    setStarted(false);
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

  const time = started
    ? moment.utc(remainingDurationInMs)
    : moment.utc(timerDurationInMs);

  return {
    time,
    start,
    stop,
    started,
    paused,
    reset,
  };
};
