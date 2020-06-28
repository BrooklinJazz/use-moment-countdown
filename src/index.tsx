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
}

export const useCountdown = (input: { m?: number; s?: number; h?: number }) => {

  const { m = 0, s = 0, h = 0 } = input;
  const intervalInMs = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;
  const [count, setCount] = React.useState(0);
  const diff = intervalInMs - count;
  const remainingDuration = moment.duration(diff, "milliseconds");
  const remainingMilliseconds = remainingDuration.asMilliseconds();

  const [started, setStart] = React.useState(false);

  useInterval(() => {
    if (started && remainingMilliseconds !== 0) {
      setCount(count + 1000);
    }
  }, 1000);

  return {
    time: moment.utc(remainingMilliseconds),
    start: () => setStart(true),
    stop: () => setStart(false),
    started
  };
};
