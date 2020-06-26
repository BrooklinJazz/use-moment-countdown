# useCountdown

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

## Usage with minutes

```tsx
import React from 'react'

import  { useCountdown } from 'use-moment-countdown'

const App = () => {
  const {start, time} = useCountdown({m: 10})
  return (
    <div onClick={start}>
      {time.format("hh:mm:ss")}
    </div>
  )
}

export default App

```

## Usage with hours

```tsx
import React from 'react'

import  { useCountdown } from 'use-moment-countdown'

const App = () => {
  const {start, time} = useCountdown({h: 1})
  return (
    <div onClick={start}>
      {time.format("hh:mm:ss")}
    </div>
  )
}

export default App

```

## Usage with seconds

```tsx
import React from 'react'

import  { useCountdown } from 'use-moment-countdown'

const App = () => {
  const {start, time} = useCountdown({s: 30})
  return (
    <div onClick={start}>
      {time.format("hh:mm:ss")}
    </div>
  )
}

export default App

```

## Usage with combination of hours, minutes, and seconds

```tsx
import React from 'react'

import  { useCountdown } from 'use-moment-countdown'

const App = () => {
  const {start, time} = useCountdown({h:1, m: 20, s: 30})
  return (
    <div onClick={start}>
      {time.format("hh:mm:ss")}
    </div>
  )
}

export default App

```

## You must provide an input

```tsx
import React from 'react'

import  { useCountdown } from 'use-moment-countdown'

const App = () => {
  const {start, time} = useCountdown({}) // this will throw an error
  return (
    <div onClick={start}>
      {time.format("hh:mm:ss")}
    </div>
  )
}

export default App

```

## License

MIT © [BrooklinJazz](https://github.com/BrooklinJazz)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
