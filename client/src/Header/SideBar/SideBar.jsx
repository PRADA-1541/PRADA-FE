import React, { useEffect } from 'react';
import './SideBar.scss';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultImage from '../../assets/images/defaultImage.png';
import useClickState from '../../hooks/useClickState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoAtom, isSignedInAtom } from '../../recoil/atom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useCookies } from 'react-cookie';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_SIGNIN_REDIRECT;
const KAKAO_LOGIN_API = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [ref, handleClickOutside] = useClickState(setIsMenuOpen);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const [, , removeCookie] = useCookies(['refresh-token']);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const logout = () => {
    setIsSignedIn(false);
    setIsMenuOpen(false);
    removeCookie('refresh-token');
  };

  return (
    <>
      {!isMobile && <div className={isMenuOpen ? 'background' : 'background_hidden'} />}
      <div className={isMenuOpen ? (isSignedIn ? 'sideBarSignedIn' : 'sideBar') : 'sideBar_hidden'} ref={ref}>
        {isMobile && <HiMenuAlt2 className='closeSideBar' onClick={() => setIsMenuOpen(false)} />}
        <div className='profile'>
          <img
            className='profileImg'
            src={
              isSignedIn
                ? userInfo.profileImage
                  ? defaultImage
                  : process.env.REACT_APP_IMG_BASE_URL + userInfo.profileImage
                : defaultImage
            }
            alt='profile Image'
          />
          {isSignedIn ? (
            <span className='profileName'>{userInfo.nickname}</span>
          ) : (
            <Link className='login' to={KAKAO_LOGIN_API}>
              로그인 해주세요.
            </Link>
          )}
        </div>
        <ul>
          <Link to='/cocktail/new'>
            <li>레시피 작성</li>
          </Link>
          <Link to='/cocktails/official'>
            <li>공식 레시피</li>
          </Link>
          <Link to='/cocktails/custom'>
            <li>커스텀 레시피</li>
          </Link>
          {isSignedIn && (
            <>
              <hr />
              <Link to='/cocktails/favorite'>
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
            </>
          )}
        </ul>
        {isSignedIn && (
          <div className='logoutContainer'>
            <button className='logout' onClick={logout}>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </>
  );
};

SideBar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default SideBar;
