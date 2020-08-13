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
  const flipHandler = ({ currentTarget: { dataset } }) => {
    handler(true)
    const { id, code } = dataset

    const flippedCards = cards.filter(({ flipped }) => flipped)

    if (flippedCards.length < 2) {
      setCards(
        truthifyCards("id", "flipped", id)
      )

      if (flippedCards[0]?.code === code) {
        setCards(
          truthifyCards('code', 'matched', code)
        )

        if(!cards.find(({matched}) => !matched)) {
          handler(false)
        }



      }
    }

    if (flippedCards[0]) {
      setTimeout(() => {

        setCards(
          cards.map(card => {
            card.flipped = false
            return card
          }
          )

          , 3000)
      })
    }

  }

  const truthifyCards = (k2locate, k2change, val2match) => {
    cards.map(card => {
      if (card[k2locate] === [val2match]) {
        card[k2change] = true
      }
      return card
    })

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
