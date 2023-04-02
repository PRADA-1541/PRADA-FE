import React from 'react';
import SimpleCocktailPreview from '../Preview/SimpleCocktailPreview';
import './Main.scss';

const Home = () => {
  return (
    <div className='homeContainer'>
      <SimpleCocktailPreview />
    </div>
  );
};

export default Home;
