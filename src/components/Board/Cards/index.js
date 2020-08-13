import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './Cards.css'
import { Card } from './Card'
import api from 'api'

export const Cards = ({ handler }) => {

  const [cards, setCards] = useState([])

  //Async cards fetch
  useEffect(() => {
    (async () => {
      const { cards } = await api.index(4)
      //Assign each one a unique id, by using code and current index
      const cardDups = JSON.parse(JSON.stringify(cards.concat(Array.from(cards)))).map((card, i) => {
        card.id = `${card.code}-${i}`
        return card
      })
      setCards(cardDups)
    })()
  }, [])

  //Handling flip
  const flipHandler = ({ currentTarget: {dataset}}) => {
    handler(true)
    const {id} = dataset
    const {code} = dataset

    const flippedCards = cards.filter(card => id === card.id ? card.flipped = true : card)

    if (!flippedCards.length) {
      setCards(
        cards.map(card => {
          if (card.id === id) {
            cards.flipped = true
          }

          return card
        })
      )
    }

    if (flippedCards.length < 2) {
      setCards(
        cards.map(card => {
          if (card.id === id) {
            cards.flipped = true
          }

          return card
        })
      )
    }

    //check if any cards are currently flipped

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
      )
      )
      }
    </div>
  )
}

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  handler: PropTypes.func,
}
