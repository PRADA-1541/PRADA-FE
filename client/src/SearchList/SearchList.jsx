import React, { useEffect, useState } from 'react';
import './SearchList.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { RecipeList } from '../CocktailList/CocktailList';
import { SlArrowDown } from 'react-icons/sl';
import DropDown from '../Material/DropDown/DropDown';
import { GetSearchRecipeList, GetSearchIngredientList } from '../api/search';
import Ingredient from '../Material/Ingredient/Ingredient_bg/Ingredient';
// import data from '../assets/data/cocktails.json';

const SearchList = () => {
  const { searchWord } = useParams();
  const [newSearchWord, setNewSearchWord] = useState(searchWord);
  const [value, setValue] = useState(0);

  const [cursor, setCursor] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
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
    setNewSearchWord(searchWord);
    getCocktailList('', []);
  }, [value, sort, searchWord]);

  const getCocktailList = (cursor, prevList) => {
    switch (value) {
      case 0:
        GetSearchRecipeList(0, cursor, 2, sortMap[sort], 'name', searchWord, setCursor, prevList, setRecipeList);
        break;
      case 1:
        GetSearchRecipeList(1, cursor, 2, sortMap[sort], 'name', searchWord, setCursor, prevList, setRecipeList);
        break;
      case 2:
        GetSearchIngredientList(2, cursor, searchWord, setCursor, prevList, setIngredientList);
        break;
      default:
        alert('잘못된 접근입니다.');
        navigate('/');
        break;
    }
  };

  const handleSort = (e) => {
    e.stopPropagation();
    setDropDown(!dropDown);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const IngredientList = () => {
    return (
      <div style={{ width: '80%', margin: 'auto' }}>
        {ingredientList.map((ingredient) => (
          <Ingredient key={ingredient.ingredientIdx} ingredient={ingredient} />
        ))}
      </div>
    );
  };

  return (
    <div className='searchListContainer'>
      <h1>{newSearchWord}에 대한 검색결과</h1>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} textColor='inherit' variant='fullWidth' centered onChange={handleChange}>
          <Tab label='공식 레시피' sx={{ fontSize: '0.8rem' }} />
          <Tab label='커스텀 레시피' sx={{ fontSize: '0.8rem' }} />
          <Tab label='재료' sx={{ fontSize: '0.8rem' }} />
        </Tabs>
      </Box>
      {value !== 2 && (
        <div className='sort'>
          <div className='curSort' onMouseDown={(e) => handleSort(e)}>
            {sort}
            <SlArrowDown />
          </div>
          {dropDown && <DropDown setDropDown={setDropDown} list={sortList} onClick={setSort} />}
        </div>
      )}
      {value === 2 ? <IngredientList /> : <RecipeList recipeList={recipeList} />}
      {cursor && (
        <div className='moreList'>
          <SlArrowDown onClick={() => getCocktailList(cursor, recipeList)} />
        </div>
      )}
    </div>
  );
};

export default SearchList;
