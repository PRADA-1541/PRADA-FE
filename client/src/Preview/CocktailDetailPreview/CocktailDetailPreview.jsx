import React from 'react';
import './CocktailDetailPreview.scss';
import PropTypes from 'prop-types';
import defaultImage from '../../assets/images/defaultImage.png';
import { AiFillStar } from 'react-icons/ai';
import MaterialBox from '../../Material/MaterialBox/MaterialBox';

const CocktailDetailPreview = ({ name, imageURL, content, keywords, evaluation, ingredients }) => {
  return (
    <div className='detailPreviewContainer'>
      <p className='cocktailEval'>
        <AiFillStar className='evalStar' />
        {evaluation}
      </p>
      <div className='imgAndNameContainer'>
        <div className='cocktailImg'>
          <img src={imageURL ?? defaultImage} alt='cocktail image' />
        </div>
        <p>{name}</p>
      </div>
      <div className='cocktailContents'>
        <p className='cocktailContent'>{content}</p>
        <MaterialBox type='재료' ingredients={ingredients} />
        <MaterialBox type='키워드' keywords={keywords} />
      </div>
    </div>
  );
};

CocktailDetailPreview.propTypes = {
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  content: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  evaluation: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CocktailDetailPreview;
