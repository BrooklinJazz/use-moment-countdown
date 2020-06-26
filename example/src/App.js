import React from 'react'

import  {useCountdown} from 'use-moment-countdown'

const App = () => {
  const {start, time} = useCountdown({m: 1})
  return (
    <div onClick={start}>
      {time.format("mm:ss")}
    </div>
  )
}

export default App
