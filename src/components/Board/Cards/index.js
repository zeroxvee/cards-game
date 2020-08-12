import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './Cards.css'
import { Card } from './Card'

export const Cards = ({ cards, handler }) => {

  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])

  useEffect(() => {
    if (flippedCards.length && flippedCards[0].code === flippedCards[1]?.code) {
      setMatchedCards((prev) => prev.concat(flippedCards[0]?.code))
      if (matchedCards.length === cards.length/2-1) {
        handler(false)
      }
      setFlippedCards([])
    }
    if (flippedCards.length === 2) {
      setTimeout(() => {
        setFlippedCards([])
      }, 3000)

    }

  }, [flippedCards])

  //Handling flip
  const flipHandler = ({ target: { dataset } }) => {
    if (dataset && !flippedCards.length) {
      setFlippedCards(flippedCards => flippedCards.concat({ id: dataset.id, code: dataset.code })
      )
      //Make sure same card wasn't clicked twice
    } else if (flippedCards[0].id !== dataset.id && flippedCards.length < 2) {
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
