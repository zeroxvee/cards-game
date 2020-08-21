import React, { useState } from 'react'

export const HighScores = () => {

  const [scores, setScores] = useState([{
    initials: 'Vb',
    time: '1:00',
    numOfCards: 8
  }])

  return (
    <table>
      <tbody>
        {scores.map((person, i) => (
          <td key={i}>
            <tr>{person.initials}</tr>
            <tr>{person.time}</tr>
            <tr>{person.numOfCards}</tr>
          </td>
        ))}
      </tbody>
    </table>
  )

}
