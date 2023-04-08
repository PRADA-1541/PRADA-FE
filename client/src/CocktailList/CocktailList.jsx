import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../assets/data/cocktails.json';
import './CocktailList.scss';
import CocktailDetailPreview from '../Preview/CocktailDetailPreview/CocktailDetailPreview';

const CocktailList = () => {
  const { category } = useParams();

  const RecipeList = () => {
    return data.map((cocktail) => (
      <CocktailDetailPreview
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
      <h1>{category}</h1>
      <RecipeList />
    </>
  );
};

export default CocktailList;
