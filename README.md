# useCountdown

check out my explanatory blog post [here](https://medium.com/@brooklinjazzmyers/create-a-custom-hook-for-managing-timers-in-react-or-react-native-92362241ae43)

> a react hook for creating countdown timers with moment.js

[![NPM](https://img.shields.io/npm/v/use-moment-countdown.svg)](https://www.npmjs.com/package/use-moment-countdown) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install dependencies

```bash
npm install --save moment
```

## Install use-moment-countdown

```bash
npm install --save use-moment-countdown
```

# Usage

## timer set in minutes

```tsx
import React from "react";

import { useCountdown } from "use-moment-countdown";

const App = () => {
  const { start, time } = useCountdown({ m: 10 });
  return <div onClick={start}>{time.format("hh:mm:ss")}</div>;
};

export default App;
```

## timer set in hours

```tsx
import React from "react";

import { useCountdown } from "use-moment-countdown";

const App = () => {
  const { start, time } = useCountdown({ h: 1 });
  return <div onClick={start}>{time.format("hh:mm:ss")}</div>;
};

export default App;
```

## timer set in seconds

```tsx
import React from "react";

import { useCountdown } from "use-moment-countdown";

const App = () => {
  const { start, time } = useCountdown({ s: 30 });
  return <div onClick={start}>{time.format("hh:mm:ss")}</div>;
};

export default App;
```

## timer set in combination of hours, minutes, and seconds

```tsx
import React from "react";

import { useCountdown } from "use-moment-countdown";

const App = () => {
  const { start, time } = useCountdown({ h: 1, m: 20, s: 30 });
  return <div onClick={start}>{time.format("hh:mm:ss")}</div>;
};

export default App;
```

## recurring timer

```tsx
import React from "react";

import { useCountdown } from "use-moment-countdown";

const App = () => {
  const { start, time } = useCountdown({ s: 30 }, {recurring: true});
  return <div onClick={start}>{time.format("hh:mm:ss")}</div>;
};

export default App;
```

## onDone callback when timer ends

```tsx
import React from "react";

import { useCountdown } from "use-moment-countdown";

const App = () => {
  const myOnDoneCallback = () => alert("Your timer has finished!")
  const { start, time } = useCountdown({ s: 30 }, {onDone: myOnDoneCallback});
  return <div onClick={start}>{time.format("hh:mm:ss")}</div>;
};

export default App;
```

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
