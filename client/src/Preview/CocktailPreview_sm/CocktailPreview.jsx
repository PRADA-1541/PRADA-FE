import React from 'react';
import PropTypes from 'prop-types';
import './CocktailPreview.scss';
import defaultImage from '../../assets/images/defaultImage.png';
import { AiFillStar } from 'react-icons/ai';

const CocktailPreview = ({ imageURL, name, evaluation }) => {
  return (
    <div className='previewContainer'>
      <div className='previewImgContainer'>
        <img src={imageURL ?? defaultImage} alt='cocktail' className={imageURL ? 'previewImg' : 'altImg'} />
      </div>
      <p className='cocktailName'>{name}</p>
      <p className='cocktailEval'>
        <AiFillStar />
        {evaluation}
      </p>
    </div>
  );
};

CocktailPreview.propTypes = {
  imageURL: PropTypes.string,
  name: PropTypes.string.isRequired,
  evaluation: PropTypes.number.isRequired,
};

export default CocktailPreview;
