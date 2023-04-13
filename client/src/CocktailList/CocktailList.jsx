import React from 'react';
import './CocktailList.scss';
import { useParams } from 'react-router-dom';
import data from '../assets/data/cocktails.json';
import CocktailPreview from '../Preview/CocktailPreveiw_bg/CocktailPreview';

const CocktailList = () => {
  const { category } = useParams();

  const RecipeList = () => {
    return data.map((cocktail) => (
      <CocktailPreview
        key={cocktail.cocktailIdx}
        name={cocktail.cocktailName}
        imageURL={cocktail.cocktailImage}
        content={cocktail.cocktailDescription}
        keywords={cocktail.cocktailKeyword}
        evaluation={cocktail.averageRating}
        ingredients={cocktail.IngredientsURL}
      />
    ));
  };

  return (
    <>
      <h1 className='category'>{category}</h1>
      <RecipeList />
    </>
  );
};

export default CocktailList;
