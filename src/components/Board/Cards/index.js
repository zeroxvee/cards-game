import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './Cards.css'
import { Card } from './Card'

export const Cards = ({ cards }) => {

  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])

  useEffect(() => {
    if (flippedCards[0]?.code === flippedCards[1]?.code) {
      setMatchedCards(prev => prev.concat(flippedCards[0]?.code))
    }
  },[flippedCards])

  //Handling flip
  const flipHandler = ({ target: { dataset } }) => {
    if (!flippedCards.length) {
      setFlippedCards(flippedCards => flippedCards.concat({ id: dataset.id, code: dataset.code })
      )
      //Make sure same card wasn't clicked twice
    } else if (flippedCards.length < 2 && flippedCards[0].id !== dataset.id) {
      setFlippedCards(flippedCards => flippedCards.concat({
        id: dataset.id, code: dataset.code
      })
      )
    }

  }

  //Render components
  return (
    <div className="container">
      {cards.map((card, i) => {
        //
        if (card.id === flippedCards[0]?.id || card.id === flippedCards[1]?.id) {
          card.flipped = true
        }

        if (matchedCards.includes(card.code)) {
          card.matched = true
        }

        return <Card
          code={card.code}
          id={card.id}
          image={card.image}
          suit={card.suit}
          value={card.value}
          key={i}
          flipped={card.flipped}
          handler={flipHandler}
          matched={card.matched}
        />
      }
      )
      }
    </div>
  )
}

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  handler: PropTypes.func,
}
