import * as React from "react";
import moment from "moment";

const useInterval = (callback: () => any, delay: number = 1000) => {
  const savedCallback = React.useRef<() => any>(() => true);

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export type CountdownInput = { m?: number; s?: number; h?: number } | undefined;
export type CountdownConfig = { onDone?: () => any; recuring?: boolean };

// doAfterRender to avoid triggering callback such as alert and halting
// the ui-thread before time hits 0
const doAfterRender = (callback: () => any) => {
  const timeout = setTimeout(() => {
    callback();
    clearTimeout(timeout);
  }, 1);
};

export const useCountdown = (
  input: CountdownInput = {},
  config: CountdownConfig = {}
) => {
  const { m = 0, s = 0, h = 0 } = input;
  const { onDone = () => true, recuring = false } = config;

  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const [paused, setPaused] = React.useState(false)

  const start = React.useCallback(() => {
    setPaused(false)
    setStarted(true)
  }, [])
  
  const stop = React.useCallback(() => {
    setPaused(true)
    setStarted(false)
  }, [])

  const reset = React.useCallback(() => {
    setPaused(false)
    setCount(0)
  }, [])

  const intervalInMs = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;
  const diff = intervalInMs - count;

  const remainingDuration = moment.duration(diff, "milliseconds");
  const remainingMilliseconds = remainingDuration.asMilliseconds();

  const shouldReset = started && remainingMilliseconds === 0 && recuring;
  const isDone = started && remainingMilliseconds === 0;

  if (shouldReset) {
    doAfterRender(() => {
      onDone();
    });
  } else if (isDone) {
    doAfterRender(() => {
      stop();
      onDone();
    });
  }

  useInterval(
    () => {
      if (started && !isDone) {
        setCount(count + 1000);
      }
      if (shouldReset) {
        reset();
      }
    },
    started ? 1000 : undefined
  );

  return {
    time: moment.utc(remainingMilliseconds),
    start,
    stop,
    started,
    paused,
    reset
  };
};
