import React from 'react';
import './Main.scss';
import CocktailPreview from '../Preview/CocktailPreveiw_bg/CocktailPreview';
import CocktailList from './CocktailList/CocktailList';
import data from '../assets/data/cocktails.json';
// import testImage from '../assets/images/pngwing.com-2 (1).png';
// import testImage from '../assets/images/pngwing.com-5.png';
// import testImage from '../assets/images/pngwing.com-6.png';

const Main = () => {
  const { cocktailIdx, cocktailName, cocktailDescription, cocktailImage, cocktailKeyword } = data[0];
  // const { cocktailIdx, cocktailName, cocktailDescription, cocktailKeyword } = data[0];

  return (
    <div className='homeContainer'>
      <CocktailPreview
        cocktailIdx={cocktailIdx}
        korName={cocktailName}
        name={cocktailName}
        content={cocktailDescription}
        imageURL={cocktailImage}
        // imageURL={testImage}
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

export default Main;
