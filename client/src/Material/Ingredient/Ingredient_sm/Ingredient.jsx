import React from 'react';
import './Ingredient.scss';
import PropTypes from 'prop-types';

const Ingredient = ({ ingredient }) => {
  return (
    <div className='ingredientBox'>
      <img className='ingredientImg' src={ingredient.ingredientImage} alt='재료 이미지' />
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    ingredientImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default Ingredient;
