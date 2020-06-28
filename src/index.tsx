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

type CountdownInput = { m?: number; s?: number; h?: number } | undefined;

export const useCountdown = (
  input: CountdownInput = {},
  config: { onDone: () => any } = { onDone: () => true }
) => {
  const { m = 0, s = 0, h = 0 } = input;
  const { onDone } = config;
  const intervalInMs = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;
  const [count, setCount] = React.useState(0);
  const diff = intervalInMs - count;
  const remainingDuration = moment.duration(diff, "milliseconds");
  const remainingMilliseconds = remainingDuration.asMilliseconds();

  const [started, setStarted] = React.useState(false);

  useInterval(
    () => {
      if (started && remainingMilliseconds !== 0) {
        setCount(count + 1000);
      }
      if (started && remainingMilliseconds === 0) {
        setStarted(false);
        onDone();
      }
    },
    started ? intervalInMs : undefined
  );

  return {
    time: moment.utc(remainingMilliseconds),
    start: () => setStarted(true),
    stop: () => setStarted(false),
    started,
  };
};
