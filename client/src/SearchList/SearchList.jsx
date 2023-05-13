import React, { useEffect, useState } from 'react';
import './SearchList.scss';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { RecipeList } from '../CocktailList/CocktailList';
import data from '../assets/data/cocktails.json';

const SearchList = () => {
  const { searchWord } = useParams();
  const [newSearchWord, setNewSearchWord] = useState(searchWord);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setNewSearchWord(searchWord);
  }, [searchWord]);

  return (
    <div className='searchListContainer'>
      <h1>{newSearchWord}에 대한 검색결과</h1>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} textColor='inherit' variant='fullWidth' centered onChange={handleChange}>
          <Tab label='공식 레시피' />
          <Tab label='커스텀 레시피' />
          <Tab label='재료' />
        </Tabs>
      </Box>
      <RecipeList recipeList={data} />
    </div>
  );
};

export default SearchList;
