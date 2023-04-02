import React from 'react';
import './CocktailPreview.scss';
import { AiFillStar } from 'react-icons/ai';

const CocktailPreview = () => {
  return (
    <div className='previewContainer'>
      <div className='previewImgContainer'>
        <img
          src='https://cdn.pixabay.com/photo/2017/09/25/13/12/drink-2785074_1280.jpg'
          alt='cocktail'
          className='previewImg'
        />
      </div>
      <p className='cocktailName'>칵테일 이름</p>
      <p className='cocktailEval'>
        <AiFillStar />
        4.5
      </p>
    </div>
  );
};

export default CocktailPreview;
