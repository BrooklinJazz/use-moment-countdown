import React from "react";

import { useCountdown } from "use-moment-countdown";

const Container = ({children}) => (
  <div
    style={{
      height: 200,
      width: 200,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      border: "solid 1px black",
      marginBottom: 50
    }}
  >{children}</div>
);

const RecuringTimer = () => {
  const { start, time, stop } = useCountdown(
    { s: 10 },
    {
      recurring: true,
      onDone: () => console.warn("You can pass an onDone function like this!"),
    }
  );
  return (
    <Container>
      {time.format("mm:ss")}
      <button style={{ marginTop: 20 }} onClick={start}>
        Start Recuring Timer
      </button>
      <button style={{ marginTop: 20 }} onClick={stop}>
        Stop
      </button>
    </Container>
  );
};

const Timer = () => {
  const { start, time, stop } = useCountdown(
    { s: 10 },
    {
      onDone: () => console.warn("You can pass an onDone function like this!"),
    }
  );
  return (
    <Container>
      {time.format("mm:ss")}
      <button style={{ marginTop: 20 }} onClick={start}>
        Start Regular Timer
      </button>
      <button style={{ marginTop: 20 }} onClick={stop}>
        Stop
      </button>
    </Container>
  );
};

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <RecuringTimer />
      <Timer />
    </div>
  );
};

export default App;
