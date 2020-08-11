import React from 'react'
import PropTypes from 'prop-types'

export const Card = ({ flipped, matched, image, value, suit, handler, code, id }) => {


  return (
    <>
      <img alt={`${value} of ${suit}`}
      src={flipped ? image : 'https://source.unsplash.com/random/225x314'}
      onClick={handler}
      data-id={id}
      data-code={code}/>
    </>
  )
}

Card.propTypes = {
  code: PropTypes.string,
  flipped: PropTypes.bool,
  handler: PropTypes.func,
  id: PropTypes.number,
  image: PropTypes.string.isRequired,
  matched: PropTypes.bool,
  suit: PropTypes.string,
  value: PropTypes.string.isRequired,
}

Card.defaultProps = {
  flipped: false,
  matched: false
}
