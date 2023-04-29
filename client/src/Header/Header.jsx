import React, { useState, useEffect } from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import SideBar from './SideBar/SideBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
