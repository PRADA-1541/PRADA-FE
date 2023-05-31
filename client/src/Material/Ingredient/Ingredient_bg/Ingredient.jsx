import React from 'react';
import './Ingredient.scss';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import defaultImg from '../../../assets/images/defaultImage.png';
import refrigerator from '../../../assets/images/refrigerator/refrigerator8.png';

const Ingredient = ({ ingredient }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isRecipeDetail = pathname.startsWith('/cocktail/') & (pathname !== '/cocktail/new');

  const search = () => {
    navigate(`/search/${ingredient.ingredientName}/${ingredient.ingredientIdx}`);
  };

  return (
    <div
      className={isRecipeDetail ? 'ingredientContainer_bg_recipe' : 'ingredientContainer_bg'}
      onClick={isRecipeDetail ? search : null}
    >
      <img
        className='ingredientImg_bg prevent-overflow'
        src={ingredient.ingredientImage ? process.env.REACT_APP_IMG_BASE_URL + ingredient.ingredientImage : defaultImg}
        alt={ingredient.ingredientName}
      />
      <div className='ingredientNameAndVolume_bg prevent-overflow'>
        <p>{ingredient.ingredientName}</p>
        <span className='ingredientCategory_bg'>{ingredient.ingredientCategory}</span>
        {ingredient.ingredientVolume && (
          <div style={{ position: 'relative' }}>
            <span>
              {ingredient.ingredientVolume}
              {ingredient.volumeUnit}
            </span>
            {ingredient.hasIngredient && <img src={refrigerator} alt='냉장고' className='isInRefrigerator' />}
          </div>
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
