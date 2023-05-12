import React, { useEffect } from 'react';
import './SideBar.scss';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultImage from '../../assets/images/defaultImage.png';
import useClickState from '../../hooks/useClickState';
import { HiMenuAlt2 } from 'react-icons/hi';

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [ref, handleClickOutside] = useClickState(setIsMenuOpen);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      {!isMobile && <div className={isMenuOpen ? 'background' : 'background_hidden'} />}
      <div className={isMenuOpen ? 'sideBar' : 'sideBar_hidden'} ref={ref}>
        {isMobile && <HiMenuAlt2 className='closeSideBar' onClick={() => setIsMenuOpen(false)} />}
        <div className='profile'>
          <img className='profileImg' src={defaultImage} alt='profile Image' />
          <span className='profileName'>김준하</span>
        </div>
        <ul>
          <Link to='/cocktail/new'>
            <li>레시피 작성</li>
          </Link>
          <Link to='/cocktails/IBM'>
            <li>공식 레시피</li>
          </Link>
          <Link to='/cocktails/custom'>
            <li>커스텀 레시피</li>
          </Link>
          <Link>
            <li>칵테일 가이드 라인</li>
          </Link>
          <hr />
          <Link>
            <li>즐겨찾기</li>
          </Link>
          <hr />
          <Link to='/refrigerator/list'>
            <li>내 냉장고</li>
          </Link>
          <Link to='/myPosting'>
            <li>내가 작성한 글/평점</li>
          </Link>
          <Link>
            <li>내 프로필 관리</li>
          </Link>
        </ul>
        <div className='logoutContainer'>
          <button className='logout'>로그아웃</button>
        </div>
      </div>
    </>
  );
};

SideBar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default SideBar;
