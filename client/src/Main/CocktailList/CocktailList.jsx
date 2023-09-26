import React, { useEffect, useState } from 'react';
import './CocktailList.scss';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import CocktailPreview from '../../Preview/CocktailPreview_sm/CocktailPreview';
import Proptypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

const CocktailList = ({ category, data }) => {
  const [isFirst, setIsFirst] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  useEffect(() => {
    if (data.length > 5) setIsFirst(1);
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
      .filter((item, idx) => ((isFirst === 1) | (isFirst === 0) ? idx < 5 : idx >= 5 && idx < 10))
      .map((cocktail) => (
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
      <h2>{category}</h2>
      <div className='cocktailListContainer'>
        {isMobile ? (
          <CocktailPreviewsMobile />
        ) : (
          <>
            {!isMobile && isFirst === 2 && <SlArrowLeft className='arrowLeft' onClick={prevList} />}
            <div className='cocktailContainer'>
              <CocktailPreviews />
            </div>
            {!isMobile && isFirst === 1 && <SlArrowRight className='arrowRight' onClick={nextList} />}
          </>
        )}
      </div>
    </div>
  );
};

CocktailList.propTypes = {
  category: Proptypes.string.isRequired,
  data: Proptypes.array.isRequired,
};

export default CocktailList;
