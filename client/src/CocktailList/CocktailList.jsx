import React, { useState, useEffect } from 'react';
import './CocktailList.scss';
import { useParams, useNavigate } from 'react-router-dom';
// import data from '../assets/data/cocktails.json';
import defaultImg from '../assets/images/defaultImage.png';
import CocktailPreview from '../Preview/CocktailPreveiw_bg/CocktailPreview';
import { SlArrowDown } from 'react-icons/sl';
import DropDown from '../Material/DropDown/DropDown';
import { GetFavoriteRecipeList, GetRecipeList } from '../api/recipeService';

export const RecipeList = ({ recipeList }) => {
  return recipeList.map((cocktail) => (
    <CocktailPreview
      key={cocktail.cocktailIdx}
      cocktailIdx={cocktail.cocktailIdx}
      korName={cocktail.cocktailKorName}
      name={cocktail.cocktailName}
      imageURL={cocktail.cocktailImage ? process.env.REACT_APP_IMG_BASE_URL + cocktail.cocktailImage : defaultImg}
      content={cocktail.cocktailDescription}
      keywords={cocktail.cocktailKeyword.split(', ')}
      evaluation={cocktail.averageRating}
      ingredients={cocktail.ingredientInfo}
    />
  ));
};

const CocktailList = () => {
  const { category } = useParams();
  const [curCategory, setCurCategory] = useState('');
  const [cursor, setCursor] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [sort, setSort] = useState('최근 등록순');
  const sortList = ['최근 등록순', '평점순', '조회순'];
  const sortMap = {
    '최근 등록순': 'createdAt',
    평점순: 'rating',
    조회순: 'readCount',
  };

  const navigate = useNavigate();

  useEffect(() => {
    getCocktailList('', []);
  }, [category, sort]);

  const getCocktailList = (cursor, prevList) => {
    switch (category) {
      case 'official':
        setCurCategory('공식 칵테일');
        GetRecipeList(0, cursor, 15, sortMap[sort], setCursor, prevList, setRecipeList);
        break;
      case 'custom':
        setCurCategory('커스텀 칵테일');
        GetRecipeList(1, cursor, 15, sortMap[sort], setCursor, prevList, setRecipeList);
        break;
      case 'favorite':
        setCurCategory('즐겨찾기');
        GetFavoriteRecipeList(cursor, 15, sortMap[sort], setCursor, prevList, setRecipeList);
        break;
      default:
        alert('잘못된 접근입니다.');
        navigate('/');
        break;
    }
  };

  const handle = (e) => {
    e.stopPropagation();
    setDropDown(!dropDown);
  };

  return (
    <div className='cocktailList'>
      <h1>{curCategory}</h1>
      <div className='sort'>
        <div className='curSort' onMouseDown={(e) => handle(e)}>
          {sort}
          <SlArrowDown />
        </div>
        {dropDown && <DropDown setDropDown={setDropDown} list={sortList} onClick={setSort} />}
      </div>
      <RecipeList recipeList={recipeList} />
      {cursor && (
        <div className='moreList'>
          <SlArrowDown onClick={() => getCocktailList(cursor, recipeList)} />
        </div>
      )}
    </div>
  );
};

export default CocktailList;
