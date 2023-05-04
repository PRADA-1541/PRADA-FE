import React, { useEffect } from 'react';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultImage from '../../assets/images/defaultImage.png';
import useClickState from '../../hooks/useClickState';
import { useRecoilValue } from 'recoil';
import { isSignedInAtom, userInfoAtom } from '../../recoil/atom';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_SIGNIN_REDIRECT;
const KAKAO_LOGIN_API = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [ref, handleClickOutside] = useClickState(setIsMenuOpen);
  const isSignedIn = useRecoilValue(isSignedInAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <div className={isMenuOpen ? 'background' : 'backgroundHidden'} />
      <div className={isMenuOpen ? (isSignedIn ? 'sideBarSignedIn' : 'sideBar') : 'sideBarHidden'} ref={ref}>
        <div className='profile'>
          <img
            className='profileImg'
            src={isSignedIn ? (userInfo.profileImage === '' ? defaultImage : userInfo.profileImage) : defaultImage}
            alt='profile Image'
          />
          {isSignedIn ? (
            <span className='profileName'>{userInfo.email}</span>
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
          <Link to='/cocktails/IBM'>
            <li>공식 레시피</li>
          </Link>
          <Link to='/cocktails/custom'>
            <li>커스텀 레시피</li>
          </Link>
          <Link>
            <li>칵테일 가이드 라인</li>
          </Link>
          {isSignedIn && (
            <>
              <hr />
              <Link>
                <li>즐겨찾기</li>
              </Link>
              <hr />
              <Link>
                <li>내 냉장고</li>
              </Link>
              <Link>
                <li>내가 작성한 글</li>
              </Link>
              <Link>
                <li>내 프로필 관리</li>
              </Link>
            </>
          )}
        </ul>
        {isSignedIn && (
          <div className='logoutContainer'>
            <button className='logout'>로그아웃</button>
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
