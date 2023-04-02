import React from 'react';
import './Main.scss';
import SimpleCocktailPreview from '../Preview/CocktailPreveiw_bg/SimpleCocktailPreview';
import CocktailList from './CocktailList/CocktailList';

const Home = () => {
  return (
    <div className='homeContainer'>
      <SimpleCocktailPreview />
      <CocktailList />
    </div>
  );
};

export default Home;
