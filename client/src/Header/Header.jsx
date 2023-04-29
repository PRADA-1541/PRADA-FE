import React, { useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import SideBar from './SideBar/SideBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='header'>
      <div className='headerContainer'>
        <Link className='logo' to='/'>
          BOTTENDER
        </Link>
        <HiMenuAlt2 className='menu' onClick={toggleMenu} />
      </div>
      <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};

export default Header;
