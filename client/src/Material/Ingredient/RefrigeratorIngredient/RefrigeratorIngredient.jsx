import React from 'react';
import './RefrigeratorIngredient.scss';
import PropTypes from 'prop-types';

const RefrigeratorIngredient = ({ ingredients, editState, deleteIngredient }) => {
  return ingredients.map((ingredient) => (
    <div
      className={editState ? 'ingredientInRefrigeratorEditting' : 'ingredientInRefrigerator'}
      key={ingredient.ingredientIdx}
      onClick={editState ? () => deleteIngredient(ingredient) : () => {}}
    >
      <img src={ingredient.ingredientImage} alt='재료 이미지' />
      <span className='ingredientNameInRefrigerator'>{ingredient.ingredientName}</span>
    </div>
  ));
};

RefrigeratorIngredient.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ingredientIdx: PropTypes.number.isRequired,
      ingredientName: PropTypes.string.isRequired,
      ingredientImage: PropTypes.string.isRequired,
    })
  ).isRequired,
  editState: PropTypes.bool.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
};

export default React.memo(
  RefrigeratorIngredient,
  (prevProps, nextProps) =>
    prevProps.ingredients === nextProps.ingredients && prevProps.editState === nextProps.editState
);
