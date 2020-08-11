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
      //Duplicate the cards
      //Assign each one a unique id, by using code and current index
      const cardsWithDups = cards.concat(Array.from(cards))

      setCards(cardsWithDups)
    })()

  }, [])

  const flipHandler = ({ target }) => {
    console.log(target)
  }


  return (
    <div className="container">
      {cards.map((card, i) => (

        <Card image={card.image} suit={card.suit} value={card.value} key={i} handler={flipHandler} />
      ))}
    </div>
  )
}

Cards.propTypes = {

}
