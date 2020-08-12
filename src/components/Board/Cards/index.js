import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './Cards.css'
import { Card } from './Card'

export const Cards = ({ cards }) => {

  const [flippedCards, setFlippedCards] = useState([])

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
