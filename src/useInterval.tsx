import * as React from "react";
export const useInterval = (callback: () => any, delay: number = 1000) => {
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
