import React, { useState } from 'react';
import './CocktailList.scss';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import CocktailPreview from '../../Preview/CocktailPreview_sm/CocktailPreview';
import Proptypes from 'prop-types';
// import data from '../../assets/data/cocktails.json';
import { useMediaQuery } from 'react-responsive';

const CocktailList = ({ category, data }) => {
  const [isFirst, setIsFirst] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  const prevList = () => {
    setIsFirst(true);
  };
  const nextList = () => {
    setIsFirst(false);
  };

  const CocktailPreviews = () => {
    return data
      .filter((item, idx) => (isFirst ? idx < 4 : idx >= 4 && idx < 8))
      .map((cocktail) => (
        <CocktailPreview
          key={cocktail.cocktailIdx}
          cocktailIdx={cocktail.cocktailIdx}
          imageURL={cocktail.cocktailImage}
          name={cocktail.cocktailName}
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
        evaluation={cocktail.averageRating}
      />
    ));
  };

  return (
    <div className='listContainer'>
      <h1>{category}</h1>
      <div className='cocktailContainer'>
        {isMobile ? <CocktailPreviewsMobile /> : <CocktailPreviews />}
        {!isMobile && !isFirst && <SlArrowLeft className='arrowLeft' onClick={prevList} />}
        {!isMobile && isFirst && <SlArrowRight className='arrowRight' onClick={nextList} />}
      </div>
    </div>
  );
};

CocktailList.propTypes = {
  category: Proptypes.string.isRequired,
  data: Proptypes.array.isRequired,
};

export default CocktailList;
