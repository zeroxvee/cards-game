import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './Cards.css'

import api from 'api'

import { Card } from './Card'

export const Cards = () => {

  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])

  //Async cards fetch
  useEffect(() => {
    (async () => {
      const { cards } = await api.index(4)
      //Assign each one a unique id, by using code and current index
      const cardsWithDups = JSON.parse(JSON.stringify(cards.concat(Array.from(cards)))).map((card, i) => {
        card.id = `${card.code}-${i}`
        return card
      })
      setCards(cardsWithDups)
    })()
  }, [])

  //Check if 2 flipped cards are the same ID
  useEffect(() => {

    setCards(prev => prev.map(card => {
      if (card.id === flippedCards[0].id || flippedCards[1]?.id) {
        card.flipped = true
      } return card
    })
    )

    if (flippedCards[0]?.code === flippedCards[1]?.code) {
      cards.map((card) => {
        if (card.id === flippedCards[0].id || flippedCards[1]?.id) {
          card.matched = true
          return card
        }
      })
    }

  }, [flippedCards])

  //Handling flip
  const flipHandler = ({ target: { dataset } }) => {
    if (!flippedCards.length) {
      setFlippedCards(flippedCards => flippedCards.concat({ id: dataset.id, code: dataset.code })
      )
    } else if (flippedCards[0].id !== dataset.id) {
      setFlippedCards(flippedCards => flippedCards.concat({
        id: dataset.id, code: dataset.code
      })
      )
    }
  }

  //Render components
  return (
    <div className="container">
      {cards.map((card, i) => (
        <Card
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
      ))}
    </div>
  )
}

Cards.propTypes = {

}
