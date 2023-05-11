import React, { useState, useEffect } from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import SideBar from './SideBar/SideBar';
import useScrollMove from '../hooks/useScrollMove';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [searchState, setSearchState] = useState(false);

  const scrollToTop = useScrollMove('top');

  useEffect(() => {
    setIsMenuOpen(false);
    scrollToTop();
    if (
      location.pathname === '/' ||
      location.pathname === '/cocktails/IBM' ||
      location.pathname === '/cocktails/custom'
    )
      setSearchState(true);
    else setSearchState(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const search = (e, searchWord) => {
    e.preventDefault();
    console.log(searchWord);
  };

  return (
    <>
      <header className='header'>
        <div className='headerContainer'>
          <Link className='logo' to='/' onClick={scrollToTop}>
            BOTTENDER
          </Link>
          <HiMenuAlt2 className='menu' onClick={toggleMenu} />
        </div>
        <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>
      {searchState && (
        <form
          onSubmit={(e) => {
            search(e, e.target[0].value);
          }}
        >
          <TextField
            className='search'
            sx={{ position: 'absolute' }}
            id='standard-search'
            label='검색어를 입력해주세요'
            type='search'
            variant='standard'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon style={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
          />
        </form>
      )}
    </>
  );
};

export default Header;
