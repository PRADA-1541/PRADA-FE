import React, { useState } from 'react';
import './Ingredient.scss';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const Ingredient = ({ ingredient }) => {
  const [isHover, setIsHover] = useState(false);
  const { cocktailIdx } = useParams();
  const { ingredientName, ingredientDescription } = {
    ingredientName: '레몬',
    ingredientDescription: '레몬은 맛있다. 그래서 뭐 어쩔ㅋㅋ',
  };

  return (
    <div className='ingredientBox' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <img className='ingredientImg' src={process.env.REACT_APP_IMG_BASE_URL + ingredient} alt='재료 이미지' />
      {cocktailIdx && isHover && (
        <div className='ingredientInfo'>
          <p className='ingredientName'>{ingredientName}</p>
          <p className='ingredientDescription'>{ingredientDescription}</p>
        </div>
      )}
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
};

export default Ingredient;
