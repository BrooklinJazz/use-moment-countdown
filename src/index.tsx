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

export const useCountdown = (
  input: CountdownInput = {},
  config: CountdownConfig = {}
) => {
  const { m = 0, s = 0, h = 0 } = input;
  const { onDone = () => true, recuring = false } = config;
  const intervalInMs = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;
  const [count, setCount] = React.useState(0);
  const diff = intervalInMs - count;
  const remainingDuration = moment.duration(diff, "milliseconds");
  const remainingMilliseconds = remainingDuration.asMilliseconds();

  const [started, setStarted] = React.useState(false);
  if (started && remainingMilliseconds === 0 && recuring) {
    // callOnDone after a single tick to avoid running before the
    // time renders
    const timeout = setTimeout(() => {
      onDone();
      clearTimeout(timeout);
    }, 1);
    const reset = setTimeout(() => {
      setCount(0)
      clearTimeout(reset);
    }, 1000);
  } else if (started && remainingMilliseconds === 0) {
    // callOnDone after a single tick to avoid running before the
    // time renders
    const timeout = setTimeout(() => {
      setStarted(false);
      onDone();
      clearTimeout(timeout);
    }, 1);
  }

  useInterval(
    () => {
      if (started && remainingMilliseconds !== 0) {
        setCount(count + 1000);
      }
      if (recuring && remainingMilliseconds === 0) {
        setCount(count + 1000);
      }
    },
    started ? 1000 : undefined
  );

  return {
    time: moment.utc(remainingMilliseconds),
    start: () => setStarted(true),
    stop: () => setStarted(false),
    started,
  };
};
