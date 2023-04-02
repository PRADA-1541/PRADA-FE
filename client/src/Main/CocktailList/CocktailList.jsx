import React from 'react';
import './CocktailList.scss';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import CocktailPreview from '../../Preview/CocktailPreview_sm/CocktailPreview';

const CocktailList = () => {
  return (
    <div className='listContainer'>
      <h1>HOT 칵테일</h1>
      <div className='cocktailContainer'>
        <CocktailPreview />
        <CocktailPreview />
        <CocktailPreview />
        <CocktailPreview />
        <SlArrowLeft className='arrowLeft' />
        <SlArrowRight className='arrowRight' />
      </div>
    </div>
  );
};

export default CocktailList;
