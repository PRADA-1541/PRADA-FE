import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_SIGNIN_REDIRECT;
const KAKAO_LOGIN_API = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const SignIn = () => {
  const signIn = (e) => {
    e.preventDefault();
  };

  return (
    <div className='bg'>
      <div className='authBox'>
        <h1>PRADA</h1>
        <form>
          <input type='text' placeholder='아이디' />
          <input type='password' placeholder='비밀번호' />
          <button onClick={signIn}>로그인</button>
          <Link>아이디 | 비밀번호 찾기</Link>
          <Link to={KAKAO_LOGIN_API}>카카오톡</Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
