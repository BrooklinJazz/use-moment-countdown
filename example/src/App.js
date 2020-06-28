import React from "react";

import { useCountdown } from "use-moment-countdown";

const App = () => {
  const { start, time, stop } = useCountdown({ m: 1 });
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      {time.format("mm:ss")}
      <button style={{marginTop: 20}} onClick={start}>Start</button>
      <button style={{marginTop: 20}} onClick={stop}>Stop</button>
    </div>
  );
};

export default App;
