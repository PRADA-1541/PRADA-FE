import React, { useState, useEffect } from 'react';
import './CocktailList.scss';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../assets/data/cocktails.json';
import CocktailPreview from '../Preview/CocktailPreveiw_bg/CocktailPreview';

export const RecipeList = ({ recipeList }) => {
  return recipeList.map((cocktail) => (
    <CocktailPreview
      key={cocktail.cocktailIdx}
      cocktailIdx={cocktail.cocktailIdx}
      name={cocktail.cocktailName}
      imageURL={cocktail.cocktailImage}
      content={cocktail.cocktailDescription}
      keywords={cocktail.cocktailKeyword}
      // keywords={cocktail.cocktailKeyword.split(' ')}
      evaluation={cocktail.averageRating}
      ingredients={cocktail.ingredientInfo}
    />
  ));
};

const CocktailList = () => {
  const { category } = useParams();
  const [curCategory, setCurCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    switch (category) {
      case 'official':
        setCurCategory('공식 칵테일');
        break;
      case 'custom':
        setCurCategory('커스텀 칵테일');
        break;
      case 'favorite':
        setCurCategory('즐겨찾기');
        break;
      default:
        alert('잘못된 접근입니다.');
        navigate('/');
        break;
    }
  }, [category]);

  return (
    <div className='cocktailList'>
      <h1>{curCategory}</h1>
      <RecipeList recipeList={data} />
    </div>
  );
};

export default CocktailList;
