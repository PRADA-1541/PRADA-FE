import React, { useState } from 'react';
import './CocktailPreview.scss';
import { AiFillStar } from 'react-icons/ai';
import defaultImage from '../../assets/images/defaultImage.png';
import KeyWord from '../../Material/Keyword/KeyWord';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MaterialBox from '../../Material/MaterialBox/MaterialBox';

const CocktailPreview = ({ name, imageURL, content, keywords, evaluation, ingredients }) => {
  const [evalStars, setEvalStars] = useState(0);
  const [halfStar, setHalfStar] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    if (evaluation % 1 < 0.75) {
      setEvalStars(Math.floor(evaluation));
      setHalfStar(true);
    } else {
      setEvalStars(Math.ceil(evaluation));
      setHalfStar(false);
    }
  }, [evaluation]);

  const Keywords = () => {
    return keywords.map((keyword) => <KeyWord key={keyword} keyword={keyword} />);
  };

  const EvalStars = () => {
    const starArr = new Array(evalStars).fill(0);
    return starArr.map((item, idx) => {
      return <AiFillStar key={idx} />;
    });
  };

  return (
    <div className='simplePreviewContainer'>
      {!category && <h1>오늘의 추천 칵테일</h1>}
      <div className='recipePreviewContainer'>
        <div className='cocktailImg'>
          <img src={imageURL ?? defaultImage} alt='cocktail image' />
        </div>
        <div className='cocktailInfo'>
          <h2>{name}</h2>
          <hr />
          <p className='cocktailContent'>{content}</p>
          {category && <MaterialBox type='재료' ingredients={ingredients} />}
          <div className='eval'>
            <EvalStars />
            {halfStar && (
              <div className='halfStar'>
                <AiFillStar />
              </div>
            )}
            <p>{evaluation}</p>
          </div>
          {keywords && (
            <div className='simpleKeywords'>
              <Keywords />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CocktailPreview.propTypes = {
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  content: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  evaluation: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

export default CocktailPreview;
