import React, { useEffect, useState } from 'react';
import './Main.scss';
import CocktailPreview from '../Preview/CocktailPreveiw_bg/CocktailPreview';
import CocktailList from './CocktailList/CocktailList';
import data from '../assets/data/cocktails.json';
import { RecommendedCocktail } from '../api/recommendation';
// import testImage from '../assets/images/pngwing.com-2 (1).png';
// import testImage from '../assets/images/pngwing.com-5.png';
// import testImage from '../assets/images/pngwing.com-6.png';

const Main = () => {
  const { cocktailIdx, cocktailName, cocktailDescription, cocktailImage, cocktailKeyword } = data[0];

  const [recommendedCocktailList, setRecommendedCocktailList] = useState([]);

  useEffect(() => {
    RecommendedCocktail(setRecommendedCocktailList);
  }, []);

  const Recommendation = () => {
    return recommendedCocktailList.map((cocktailList, idx) => (
      <CocktailList key={idx} category={cocktailList.rationaleType} data={cocktailList.cocktails} />
    ));
  };

  return (
    <div className='homeContainer'>
      <CocktailPreview
        cocktailIdx={cocktailIdx}
        name={cocktailName}
        content={cocktailDescription}
        imageURL={cocktailImage}
        keywords={cocktailKeyword}
        evaluation={4.3}
      />
      <Recommendation />
    </div>
  );
};

export default Main;
