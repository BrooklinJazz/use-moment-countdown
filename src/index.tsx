import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

function useInterval(callback: () => any, delay: number) {
  const savedCallback = useRef<() => any>(() => true);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


export const useCountdown = (input: { m?: number; s?: number; h?: number }) => {
  const { m = 0, s = 0, h = 0 } = input;
  if (!m && !s && !h) {
    throw Error(`useCountdown use be provided an input. you provided: ${input}`);
  }
  const intervalInMs = h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000;
  const [count, setCount] = useState(0);
  const diff = intervalInMs - count;
  const remainingDuration = moment.duration(diff, "milliseconds");
  const remainingMilliseconds = remainingDuration.asMilliseconds();

  const [started, setStart] = useState(false);

  useInterval(() => {
    if (started && remainingMilliseconds !== 0) {
      setCount(count + 1000);
    }
  }, 1000);

  return {
    time: moment.utc(remainingMilliseconds),
    start: () => setStart(true),
  };
};
