import React from 'react';
import './Ingredient.scss';
import PropTypes from 'prop-types';

const Ingredient = ({ ingredient }) => {
  return (
    <div className='ingredientContainer_bg'>
      <img src={ingredient.ingredientImage} alt={ingredient.ingredientName} />
      <div className='ingredientNameAndVolume_bg'>
        <p>{ingredient.ingredientName}</p>
        {ingredient.Volume && (
          <span>
            {ingredient.Volume}
            {ingredient.volumeUnit}
          </span>
        )}
      </div>
      <p>{ingredient.ingredientDescription}</p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    ingredientImage: PropTypes.string.isRequired,
    ingredientName: PropTypes.string.isRequired,
    Volume: PropTypes.number.isRequired,
    volumeUnit: PropTypes.string.isRequired,
    ingredientDescription: PropTypes.string.isRequired,
  }).isRequired,
};

export default Ingredient;
