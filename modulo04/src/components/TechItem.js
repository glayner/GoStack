import React from 'react'
import PropTypes from 'prop-types'

function TechItem({ tech, OnDelete }) {
  return (
    <li>
      {tech}
      <button onClick={OnDelete} type="button">Remover</button>
    </li>
  )
}
TechItem.defaultProps = {
  tech: 'oculto'
}
TechItem.propTypes = {
  tech: PropTypes.string,
  OnDelete: PropTypes.func.isRequired,
}
export default TechItem;