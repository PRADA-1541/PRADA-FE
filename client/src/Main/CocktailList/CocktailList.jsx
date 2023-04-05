import React, { useState } from 'react';
import './CocktailList.scss';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import CocktailPreview from '../../Preview/CocktailPreview_sm/CocktailPreview';

const CocktailList = () => {
  const [isFirst, setIsFirst] = useState(true);

  const prevList = () => {
    setIsFirst(true);
  };
  const nextList = () => {
    setIsFirst(false);
  };

  return (
    <div className='listContainer'>
      <h1>HOT 칵테일</h1>
      <div className='cocktailContainer'>
        <CocktailPreview
          imageURL={'https://cdn.pixabay.com/photo/2017/09/25/13/12/drink-2785074_1280.jpg'}
          name='칵테일'
          evaluation={5}
        />
        <CocktailPreview name='칵테일2' evaluation={4.4} />
        <CocktailPreview
          imageURL={'https://cdn.pixabay.com/photo/2017/09/25/13/12/drink-2785074_1280.jpg'}
          name='칵테일3'
          evaluation={3.7}
        />
        <CocktailPreview name='칵테일4' evaluation={2.8} />
        {!isFirst && <SlArrowLeft className='arrowLeft' onClick={prevList} />}
        {isFirst && <SlArrowRight className='arrowRight' onClick={nextList} />}
      </div>
    </div>
  );
};

export default CocktailList;
