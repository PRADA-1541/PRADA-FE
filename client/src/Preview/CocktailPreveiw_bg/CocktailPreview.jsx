import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './CocktailPreview.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import defaultImage from '../../assets/images/defaultImage.png';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MaterialBox from '../../Material/MaterialBox/MaterialBox';

export const CocktailInfo = ({ name, imageURL, content, keywords, evaluation, ingredients, isFavorite }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

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
        <div className='cocktailDetail'>
          <h2>
            {name}
            {cocktailIdx &&
              (isFavorite ? <AiFillStar className='favoriteStar' /> : <AiOutlineStar className='favoriteStar' />)}
          </h2>
          {!isMobile && <hr />}
          <p className='cocktailContent'>
            <Content />
          </p>
          {(category || cocktailIdx) && (
            <MaterialBox type='재료' ingredients={ingredients} isDetailRecipe={cocktailIdx ? true : false} />
          )}
        </div>
        {isMobile && <hr />}
        <div className='eval'>
          <EvalStars />
          {halfStar && (
            <div className='halfStar'>
              <AiFillStar />
            </div>
          )}
          <p>{evaluation}</p>
        </div>
        {!isMobile && keywords && <MaterialBox type='키워드' keywords={keywords} />}
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
  isFavorite: PropTypes.bool,
};

const CocktailPreview = ({ cocktailIdx, name, imageURL, content, keywords, evaluation, ingredients, isFavorite }) => {
  const { category } = useParams();

  return (
    <div className='simplePreviewContainer'>
      {!category && <h1>오늘의 추천 칵테일</h1>}
      <Link className='recipePreviewContainer' to={'/cocktail/' + cocktailIdx}>
        <CocktailInfo
          cocktailIdx={cocktailIdx}
          name={name}
          imageURL={imageURL}
          content={content}
          keywords={keywords}
          evaluation={evaluation}
          ingredients={ingredients}
          isFavorite={isFavorite}
        />
      </Link>
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
  isFavorite: PropTypes.bool,
};

export default CocktailPreview;
