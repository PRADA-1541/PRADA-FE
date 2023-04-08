import React from 'react';
import './Ingredient.scss';
import PropTypes from 'prop-types';

const Ingredient = ({ ingredient }) => {
  return <img className='ingredient' src={ingredient} alt='재료 이미지' />;
};

Ingredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
};

export default Ingredient;
