import React from 'react';
import './Ingredient.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../../assets/images/defaultImage.png';

const Ingredient = ({ ingredient }) => {
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${ingredient.ingredientName}/${ingredient.ingredientIdx}`);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className='ingredientBox' onClick={search}>
        <img
          className='ingredientImg'
          src={
            ingredient.ingredientImage ? process.env.REACT_APP_IMG_BASE_URL + ingredient.ingredientImage : defaultImage
          }
          alt='재료 이미지'
        />
      </div>
      <p className='ingredientName_sm'>{ingredient.ingredientName}</p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default Ingredient;
