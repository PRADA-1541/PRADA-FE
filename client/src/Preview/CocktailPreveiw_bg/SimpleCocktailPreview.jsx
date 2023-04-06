import React, { useState } from 'react';
import './SimpleCocktailPreview.scss';
import { AiFillStar } from 'react-icons/ai';
import defaultImage from '../../assets/images/defaultImage.png';
import KeyWord from '../../Material/Keyword/KeyWord';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const SimpleCocktailPreview = ({ name, imageURL, content, keywords, evaluation }) => {
  const [evalStars, setEvalStars] = useState(0);
  const [halfStar, setHalfStar] = useState(false);

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
      return <AiFillStar key={idx} className='evalStar' />;
    });
  };

  return (
    <div className='simplePreviewContainer'>
      <h1>오늘의 추천 칵테일</h1>
      <div className='recipePreviewContainer'>
        <img width='400px' src={imageURL ?? defaultImage} alt='cocktail image' />
        <div className='cocktailInfo'>
          <h2>{name}</h2>
          <p className='cocktailContent'>{content}</p>
          {keywords && (
            <div className='keywords'>
              <Keywords />
            </div>
          )}
          <div className='eval'>
            <EvalStars />
            {halfStar && (
              <div className='halfStar'>
                <AiFillStar className='evalStar' />
              </div>
            )}
            <p>{evaluation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

SimpleCocktailPreview.propTypes = {
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  content: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  evaluation: PropTypes.number.isRequired,
};

export default SimpleCocktailPreview;
