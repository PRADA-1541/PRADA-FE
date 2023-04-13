import React, { useState } from 'react';
import './CocktailPreview.scss';
import { AiFillStar } from 'react-icons/ai';
import defaultImage from '../../assets/images/defaultImage.png';
import KeyWord from '../../Material/Keyword/KeyWord';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MaterialBox from '../../Material/MaterialBox/MaterialBox';

export const CocktailInfo = ({ name, imageURL, content, keywords, evaluation, ingredients }) => {
  const [evalStars, setEvalStars] = useState(0);
  const [halfStar, setHalfStar] = useState(false);
  const { category, cocktailIdx } = useParams();

  useEffect(() => {
    if (evaluation % 1 < 0.75) {
      setEvalStars(Math.floor(evaluation));
      setHalfStar(true);
    } else {
      setEvalStars(Math.ceil(evaluation));
      setHalfStar(false);
    }
  }, [evaluation]);

  const Content = () => {
    if (cocktailIdx) return content;
    else
      return content
        .split(' ')
        .filter((word, idx) => idx < 20)
        .map((word, idx) => {
          if (idx !== 19) return word + ' ';
          if (idx >= 19) return word + ' ...';
        });
  };

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
    <div className='cocktailInfoContainer'>
      <div className='cocktailImg'>
        <img src={imageURL ?? defaultImage} alt='cocktail image' />
      </div>
      <div className='cocktailInfo'>
        <h2>{name}</h2>
        <hr />
        <p className='cocktailContent'>
          <Content />
        </p>
        {(category || cocktailIdx) && (
          <MaterialBox type='재료' ingredients={ingredients} isDetailRecipe={cocktailIdx ? true : false} />
        )}
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
  );
};

CocktailInfo.propTypes = {
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  content: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  evaluation: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

const CocktailPreview = ({ cocktailIdx, name, imageURL, content, keywords, evaluation, ingredients }) => {
  const { category } = useParams();
  const navigate = useNavigate();

  const moveToRecipe = () => {
    navigate(`/cocktail/${cocktailIdx}`);
  };

  return (
    <div className='simplePreviewContainer'>
      {!category && <h1>오늘의 추천 칵테일</h1>}
      <div className='recipePreviewContainer' onClick={moveToRecipe}>
        <CocktailInfo
          cocktailIdx={cocktailIdx}
          name={name}
          imageURL={imageURL}
          content={content}
          keywords={keywords}
          evaluation={evaluation}
          ingredients={ingredients}
        />
      </div>
    </div>
  );
};

CocktailPreview.propTypes = {
  cocktailIdx: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  content: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  evaluation: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

export default CocktailPreview;
