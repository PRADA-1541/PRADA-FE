/* eslint-disable no-undef */
import React from 'react';
import './Main.scss';
import SimpleCocktailPreview from '../Preview/CocktailPreveiw_bg/SimpleCocktailPreview';
import CocktailList from './CocktailList/CocktailList';
import data from '../assets/data/cocktails.json';

const Home = () => {
  const { cocktailName, cocktailDescription, cocktailImage, cocktailKeyword } = data[0];

  return (
    <div className='homeContainer'>
      <button onClick={() => methodDoesNotExist()}>Break the world</button>
      <SimpleCocktailPreview
        name={cocktailName}
        content={cocktailDescription}
        imageURL={cocktailImage}
        keywords={cocktailKeyword}
        evaluation={4.3}
      />
      <CocktailList category='HOT 칵테일' />
      <CocktailList category='높은 도수 칵테일' />
      <CocktailList category='맛있는 칵테일' />
      <CocktailList category='맛없는 칵테일' />
    </div>
  );
};

export default Home;
