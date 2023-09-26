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
import { useMediaQuery } from 'react-responsive';

const SearchList = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const { searchWord, searchIdx } = useParams();
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
    if (searchIdx) setValue(2);
  }, [searchIdx]);

  useEffect(() => {
    if (value === 2) {
      setRecipeList([]);
    }
    setNewSearchWord(searchWord);
    getList('', []);
  }, [value, sort, searchWord]);

  const getList = (cursor, prevList) => {
    switch (value) {
      case 0:
        GetSearchRecipeList(
          0,
          cursor,
          15,
          sortMap[sort],
          searchIdx ? 'ingredient' : 'name',
          searchIdx ?? searchWord,
          setCursor,
          prevList,
          setRecipeList
        );
        break;
      case 1:
        GetSearchRecipeList(
          1,
          cursor,
          15,
          sortMap[sort],
          searchIdx ? 'ingredient' : 'name',
          searchIdx ?? searchWord,
          setCursor,
          prevList,
          setRecipeList
        );
        break;
      case 2:
        GetSearchIngredientList(15, cursor, searchWord, setCursor, prevList, setIngredientList);
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

  const changeTab = (event, newValue) => {
    setValue(newValue);
  };

  const IngredientList = () => {
    return (
      <div className='searchedIngredients'>
        {ingredientList.map((ingredient) => (
          <Ingredient key={ingredient.ingredientIdx} ingredient={ingredient} />
        ))}
      </div>
    );
  };

  return (
    <div className='searchListContainer'>
      <h1>{newSearchWord}에 대한 검색결과</h1>
      <Box sx={{ width: '100%', margin: '2.5rem 0 1rem 0' }}>
        <Tabs value={value} textColor='inherit' variant='fullWidth' centered onChange={changeTab}>
          <Tab label='공식 레시피' sx={isMobile ? { fontSize: '0.8rem' } : { fontSize: '0.9rem' }} />
          <Tab label='커스텀 레시피' sx={isMobile ? { fontSize: '0.8rem' } : { fontSize: '0.9rem' }} />
          <Tab label='재료' sx={isMobile ? { fontSize: '0.8rem' } : { fontSize: '0.9rem' }} />
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
          <SlArrowDown onClick={() => getList(cursor, value === 2 ? ingredientList : recipeList)} />
        </div>
      )}
    </div>
  );
};

export default SearchList;
