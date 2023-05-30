import React, { useEffect, useState } from 'react';
import './CocktailList.scss';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import CocktailPreview from '../../Preview/CocktailPreview_sm/CocktailPreview';
import Proptypes from 'prop-types';
// import data from '../../assets/data/cocktails.json';
import { useMediaQuery } from 'react-responsive';
// import testImage from '../../assets/images/pngwing.com-2 (1).png';
// import testImage from '../../assets/images/pngwing.com-5.png';
// import testImage from '../../assets/images/pngwing.com-6.png';

const CocktailList = ({ category, data }) => {
  const [isFirst, setIsFirst] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  useEffect(() => {
    if (data.length > 4) setIsFirst(1);
    else setIsFirst(0);
  }, [data]);

  const prevList = () => {
    setIsFirst(1);
  };
  const nextList = () => {
    setIsFirst(2);
  };

  const CocktailPreviews = () => {
    return data
      .filter((item, idx) => (isFirst === 1 ? idx < 4 : idx >= 4 && idx < 8))
      .map((cocktail) => (
        <CocktailPreview
          key={cocktail.cocktailIdx}
          cocktailIdx={cocktail.cocktailIdx}
          imageURL={cocktail.cocktailImage}
          // imageURL={testImage}
          name={cocktail.cocktailName}
          korName={cocktail.cocktailKorName}
          evaluation={cocktail.averageRating}
        />
      ));
  };

  const CocktailPreviewsMobile = () => {
    return data.map((cocktail) => (
      <CocktailPreview
        key={cocktail.cocktailIdx}
        cocktailIdx={cocktail.cocktailIdx}
        imageURL={cocktail.cocktailImage}
        name={cocktail.cocktailName}
        korName={cocktail.cocktailKorName}
        evaluation={cocktail.averageRating}
      />
    ));
  };

  return (
    <div className='listContainer'>
      <h1>{category}</h1>
      <div className='cocktailContainer'>
        {isMobile ? <CocktailPreviewsMobile /> : <CocktailPreviews />}
        {!isMobile && isFirst === 2 && <SlArrowLeft className='arrowLeft' onClick={prevList} />}
        {!isMobile && isFirst === 1 && <SlArrowRight className='arrowRight' onClick={nextList} />}
      </div>
    </div>
  );
};

CocktailList.propTypes = {
  category: Proptypes.string.isRequired,
  data: Proptypes.array.isRequired,
};

export default CocktailList;
