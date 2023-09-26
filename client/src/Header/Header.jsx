import React, { useState, useEffect } from 'react';
import './Header.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import SideBar from './SideBar/SideBar';
import useScrollMove from '../hooks/useScrollMove';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import logo from '../assets/images/logo/logo_white.png';
import chatLogo from '../assets/images/logo/chat_black.png';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = useScrollMove('top');

  useEffect(() => {
    setIsMenuOpen(false);
    scrollToTop();
    setSearchWord('');
    if (
      location.pathname === '/' ||
      location.pathname === '/cocktails/official' ||
      location.pathname === '/cocktails/custom' ||
      location.pathname.startsWith('/search')
    )
      setSearchState(true);
    else setSearchState(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const search = (e) => {
    e.preventDefault();
    if (searchWord === '') {
      alert('검색어를 입력해주세요');
      return;
    }
    navigate(`/search/${searchWord}`);
  };

  return (
    <>
      <header className='header'>
        <div className='headerContainer'>
          <Link to='/' onClick={scrollToTop}>
            <img className='headerLogo' src={logo} alt='logo' />
          </Link>
          <HiMenuAlt2 className='menu' onClick={toggleMenu} />
        </div>
        <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>
      {searchState && (
        <form
          onSubmit={(e) => {
            search(e);
          }}
        >
          <TextField
            className='search'
            sx={{ position: 'absolute' }}
            id='standard-search'
            label={
              <Typography
                style={{
                  fontSize: isMobile && '0.8rem',
                }}
              >
                검색어를 입력해주세요
              </Typography>
            }
            type='search'
            variant='standard'
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
            InputProps={{
              style: {
                fontSize: isMobile && '0.8rem',
              },
              endAdornment: (
                <InputAdornment position='end'>
                  <img src={chatLogo} onClick={search} className='searchIcon' />
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
