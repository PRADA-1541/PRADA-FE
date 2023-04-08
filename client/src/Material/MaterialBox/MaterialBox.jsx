import React, { useState } from 'react';
import './MaterialBox.scss';
import PropTypes from 'prop-types';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import KeyWord from '../Keyword/KeyWord';
import Ingredient from '../Ingredient/Ingredient';

const MaterialBox = ({ type, ingredients, keywords, isDetailRecipe }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideHandler = (direction) => {
    if (direction === 'prev') {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const Ingredients = () => {
    if (!ingredients) return null;
    return ingredients
      .filter((item, idx) => {
        if (currentSlide === 0) {
          return idx < 5;
        } else {
          return idx >= currentSlide * 5 && idx < (currentSlide + 1) * 5;
        }
      })
      .map((ingredient, idx) => <Ingredient key={idx} ingredient={ingredient} />);
  };

  const Keywords = () => {
    if (!keywords) return null;
    return keywords.map((keyword) => <KeyWord key={keyword} keyword={keyword} />);
  };

  return (
    <div className='materialContainer'>
      <h1>{type}</h1>
      {type === '재료' ? (
        <div className='ingredients'>
          {!isDetailRecipe && currentSlide !== 0 && (
            <SlArrowLeft className='arrowLeft' onClick={() => slideHandler('prev')} />
          )}
          {!isDetailRecipe && currentSlide !== parseInt((ingredients.length - 1) / 5) && (
            <SlArrowRight className='arrowRight' onClick={() => slideHandler('next')} />
          )}
          <Ingredients />
        </div>
      ) : (
        <div className='keywords'>
          <Keywords />
        </div>
      )}
    </div>
  );
};

MaterialBox.propTypes = {
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  keywords: PropTypes.arrayOf(PropTypes.string),
  isDetailRecipe: PropTypes.bool,
};

export default MaterialBox;
