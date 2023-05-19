import React, { useState } from 'react';
import './MaterialBox.scss';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import KeyWord from '../Keyword/KeyWord';
import Ingredient from '../Ingredient/Ingredient';

const MaterialBox = ({ type, ingredients, keywords, isDetailRecipe }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideHandler = (e, direction) => {
    e.preventDefault();
    if (direction === 'prev') {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const Ingredients = () => {
    if (!ingredients) return null;
    if (isDetailRecipe)
      return ingredients.map((ingredient) => (
        <Ingredient key={ingredient.ingredientIdx} ingredient={ingredient.ingredientImage} />
      ));
    return ingredients
      .filter((item, idx) => {
        if (currentSlide === 0) {
          return idx < 5;
        } else {
          return idx >= currentSlide * 5 && idx < (currentSlide + 1) * 5;
        }
      })
      .map((ingredient) => <Ingredient key={ingredient.ingredientIdx} ingredient={ingredient.ingredientImage} />);
  };

  const IngredientsMobile = () => {
    if (!ingredients) return null;
    return ingredients.map((ingredient) => (
      <Ingredient key={ingredient.ingredientIdx} ingredient={ingredient.ingredientImage} />
    ));
  };

  const Keywords = () => {
    if (!keywords) return null;
    return keywords.map((keyword) => <KeyWord key={keyword} keyword={keyword} />);
  };

  return (
    <div className='materialContainer'>
      {type === '재료' ? (
        <div className='ingredients'>
          {!isMobile && !isDetailRecipe && currentSlide !== 0 && (
            <SlArrowLeft className='arrowLeft' onClick={(e) => slideHandler(e, 'prev')} />
          )}
          {!isMobile && !isDetailRecipe && currentSlide !== parseInt((ingredients.length - 1) / 5) && (
            <SlArrowRight className='arrowRight' onClick={(e) => slideHandler(e, 'next')} />
          )}
          {isMobile ? <IngredientsMobile /> : <Ingredients />}
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
  ingredients: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  isDetailRecipe: PropTypes.bool,
};

export default React.memo(MaterialBox, (prevProps, nextProps) => prevProps.ingredients === nextProps.ingredients);
