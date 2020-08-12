import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const Timer = ({ toggle }) => {
  const [time, setTime] = useState(0)



  useEffect(() => {
    while (toggle) {
      const intervalID = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)

      return () => {
        clearInterval(intervalID)
      }
    }
  })


  return (
    <p>{time}</p>
  )
}

Timer.propTypes = { toggle: PropTypes.func }
