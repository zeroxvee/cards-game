import React, { useState } from 'react'

import { Timer } from './Timer'
import { Cards } from './Cards'

export const Board = () => {

  const [toggleTimer, setToggleTimer] = useState(false)

  const handleCards = (toggle) => {
    setToggleTimer(toggle)
  }

  return (
    <main>
      <Cards handler={handleCards}/>
      <Timer toggle={toggleTimer}/>
    </main>
  )
}
