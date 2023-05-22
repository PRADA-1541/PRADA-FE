import React from 'react';
import './Ingredient.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Ingredient = ({ ingredient }) => {
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${ingredient.ingredientName}/${ingredient.ingredientIdx}`);
  };

  return (
    <div className='ingredientBox' onClick={search}>
      <img className='ingredientImg' src={ingredient.ingredientImage} alt='재료 이미지' />
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
};

export default Ingredient;
