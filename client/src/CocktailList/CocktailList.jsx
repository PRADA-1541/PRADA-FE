import React from 'react';
import './CocktailList.scss';
import { useParams } from 'react-router-dom';
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
      evaluation={cocktail.averageRating}
      ingredients={cocktail.IngredientsURL}
    />
  ));
};

const CocktailList = () => {
  const { category } = useParams();

  return (
    <div className='cocktailList'>
      <h1>{category}</h1>
      <RecipeList recipeList={data} />
    </div>
  );
};

export default CocktailList;
