import React, { useState, useEffect } from 'react'

import { Timer } from './Timer'
import { Cards } from './Cards'

export const Board = () => {



  return (
    <main>
      <Cards />
      <Timer />
    </main>
  )
}
