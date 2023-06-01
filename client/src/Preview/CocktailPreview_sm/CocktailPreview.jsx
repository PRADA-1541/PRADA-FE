import React from 'react';
import PropTypes from 'prop-types';
import './CocktailPreview.scss';
import defaultImage from '../../assets/images/defaultImage.png';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const CocktailPreview = ({ cocktailIdx, imageURL, name, korName, evaluation }) => {
  return (
    <Link className='previewContainer' to={`/cocktail/${cocktailIdx}`}>
      <div className='previewImgContainer'>
        <img
          src={imageURL ? process.env.REACT_APP_IMG_BASE_URL + imageURL : defaultImage}
          alt='cocktail'
          className={imageURL ? 'previewImg' : 'altImg'}
        />
      </div>
      <div className='cocktailInfoContainer_sm'>
        <p className='cocktailKorName'>{korName}</p>
        <p className='cocktailName'>{name}</p>
        <p className='cocktailEval'>
          <AiFillStar className='evalStar' />
          {evaluation}
        </p>
      </div>
    </Link>
  );
};

CocktailPreview.propTypes = {
  cocktailIdx: PropTypes.number.isRequired,
  imageURL: PropTypes.string,
  name: PropTypes.string.isRequired,
  korName: PropTypes.string.isRequired,
  evaluation: PropTypes.number.isRequired,
};

export default CocktailPreview;
