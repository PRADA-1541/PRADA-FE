import React, { useState, useEffect } from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import SideBar from './SideBar/SideBar';
import useScrollMove from '../hooks/useScrollMove';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToTop = useScrollMove('top');

  useEffect(() => {
    setIsMenuOpen(false);
    scrollToTop();
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='header'>
      <div className='headerContainer'>
        <Link className='logo' to='/' onClick={scrollToTop}>
          BOTTENDER
        </Link>
        <HiMenuAlt2 className='menu' onClick={toggleMenu} />
      </div>
      <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};

export default Header;
