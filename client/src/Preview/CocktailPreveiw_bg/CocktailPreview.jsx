import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import './CocktailPreview.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import defaultImage from '../../assets/images/defaultImage.png';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import MaterialBox from '../../Material/MaterialBox/MaterialBox';
import Ingredient from '../../Material/Ingredient/Ingredient_bg/Ingredient';

export const CocktailInfo = ({
  ABV,
  korName,
  name,
  imageURL,
  content,
  keywords,
  evaluation,
  ingredients,
  isFavorite,
  updateFavorite,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  const [evalStars, setEvalStars] = useState(0);
  const [halfStar, setHalfStar] = useState(false);
  const { cocktailIdx } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (evaluation === 0) {
      setEvalStars(0);
      setHalfStar(true);
    } else if (evaluation % 1 < 0.75 && evaluation % 1 > 0) {
      setEvalStars(Math.floor(evaluation));
      setHalfStar(true);
    } else {
      setEvalStars(Math.ceil(evaluation));
      setHalfStar(false);
    }
  }, [evaluation]);

  const Content = () => {
    if (cocktailIdx | (location.pathname === '/') | isMobile) return content;
    else
      return content
        .split(' ')
        .filter((word, idx) => idx < 55)
        .map((word, idx) => {
          if (idx !== 54) return word + ' ';
          if (idx >= 54) return word + ' ...';
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
          <div className='cocktailInfoHeader'>
            <h2>
              {korName}
              <span>{name}</span>
            </h2>
            <div>
              {ABV && <span className='ABV'>{ABV.toFixed(1)} 도</span>}
              {cocktailIdx &&
                (isFavorite ? (
                  <AiFillStar className='favoriteStar' onClick={() => updateFavorite(false)} />
                ) : (
                  <AiOutlineStar className='favoriteStar' onClick={() => updateFavorite(true)} />
                ))}
            </div>
          </div>
          {!isMobile && <hr />}
          <p>
            <Content />
          </p>
        </div>
        <div>
          <>
            {isMobile && cocktailIdx && <h3>재료</h3>}
            {(!cocktailIdx || !location.pathname.startsWith('/cocktail/')) && (
              <MaterialBox type='재료' ingredients={ingredients} />
            )}
            {isMobile &&
              cocktailIdx &&
              ingredients.map((ingredient) => <Ingredient ingredient={ingredient} key={ingredient.ingredientIdx} />)}
          </>
          {!isMobile && keywords && <MaterialBox type='키워드' keywords={keywords} />}
          {isMobile && keywords && (
            <>
              {cocktailIdx && <h3>키워드</h3>}
              <MaterialBox type='키워드' keywords={keywords} />
            </>
          )}
          <div className='evalBox'>
            <div className='eval'>
              <EvalStars />
              {halfStar && (
                <div className='halfStar'>
                  <AiFillStar />
                </div>
              )}
              <p>{evaluation.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CocktailInfo.propTypes = {
  ABV: PropTypes.number,
  korName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  content: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  evaluation: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  isFavorite: PropTypes.bool,
  updateFavorite: PropTypes.func,
};

const CocktailPreview = ({
  ABV,
  cocktailIdx,
  korName,
  name,
  imageURL,
  content,
  keywords,
  evaluation,
  ingredients,
  isFavorite,
}) => {
  const location = useLocation();

  return (
    <div className='simplePreviewContainer'>
      {location.pathname === '/' && <h1>오늘의 추천 칵테일</h1>}
      <Link className='recipePreviewContainer' to={'/cocktail/' + cocktailIdx}>
        <CocktailInfo
          ABV={ABV}
          cocktailIdx={cocktailIdx}
          korName={korName}
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
  ABV: PropTypes.number,
  cocktailIdx: PropTypes.number.isRequired,
  korName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  content: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  evaluation: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  isFavorite: PropTypes.bool,
};

export default CocktailPreview;
