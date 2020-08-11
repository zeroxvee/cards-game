import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './Cards.css'

import api from 'api'

import { Card } from './Card'

export const Cards = () => {

  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])

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

  const flipHandler = ({ target: {dataset}}) => {
    console.log(dataset)
    setFlippedCards(flippedCards => flippedCards.concat({id: dataset.id, code: dataset.code}))

  }


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
        flipped={flippedCards}
        handler={flipHandler} />
      ))}
    </div>
  )
}

Cards.propTypes = {

}
