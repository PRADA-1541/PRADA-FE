import React from 'react';
import './Ingredient.scss';
import PropTypes from 'prop-types';
import vodka from '../../../assets/images/ingredients/재료_보드카.png';

const Ingredient = ({ ingredient }) => {
  return (
    <div className='ingredientContainer_bg'>
      <img className='prevent-overflow' src={vodka ?? ingredient.ingredientImage} alt={ingredient.ingredientName} />
      <div className='ingredientNameAndVolume_bg prevent-overflow'>
        <p>{ingredient.ingredientName}</p>
        {ingredient.ingredientVolume && (
          <span>
            {ingredient.ingredientVolume}
            {ingredient.volumeUnit}
          </span>
        )}
      </div>
      <p className='prevent-overflow'>{ingredient.ingredientDescription}</p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default Ingredient;
