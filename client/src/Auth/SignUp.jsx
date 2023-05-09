import React, { useRef, useState } from 'react';
import './SignUp.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { NicknameValid } from '../api/authService';
import { signUp } from '../api/authService';
import { useSetRecoilState } from 'recoil';
import { userInfoAtom, isSignedInAtom } from '../recoil/atom';
import { useCookies } from 'react-cookie';

const SignUp = () => {
  const { email } = useParams();
  const nicknameRef = useRef();
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['refresh-token']);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setIsSignedIn = useSetRecoilState(isSignedInAtom);

  const nicknameValid = async () => {
    setValidation(true);
    const nickname = nicknameRef.current.value;
    const res = await NicknameValid(nickname);
    if (!res) {
      nicknameRef.current.value = '';
      setValidation(false);
    }
  };

  const signUpSubmit = async () => {
    if (nicknameRef.current.value === '') return alert('닉네임을 입력해주세요.');
    if (!validation) return alert('닉네임 중복확인을 해주세요.');
    const nickname = nicknameRef.current.value;
    // console.log(email, nickname);
    const res = await signUp(email, nickname, setUserInfo, cookies, setCookie, setIsSignedIn);
    if (res) navigate('/');
  };

  return (
    <form className='signupContainer' onSubmit={(e) => e.preventDefault()}>
      <h1>BOTTENDER</h1>
      <label htmlFor='cocktailFormImage'>
        칵테일 이미지
        <div className='cocktailFormImageBtn'>추가</div>
      </label>
      <input
        className='fileInput'
        type='file'
        id='cocktailFormImage'
        accept='.jpg, .jpeg, .png, .img'
        // ref={cocktailImageRef}
        // onChange={handleFile}
      />
      <div>
        <label htmlFor='email'>이메일</label>
        <br />
        <input type='text' id='email' value={email} disabled />
      </div>
      <div>
        <label htmlFor='nickname'>닉네임</label>
        <br />
        <div className='nicknameInput'>
          <input type='text' id='nickname' ref={nicknameRef} />
          <button className='nicknameValid' onClick={nicknameValid}>
            중복확인
          </button>
        </div>
      </div>
      <button type='submit' onClick={signUpSubmit}>
        회원가입
      </button>
    </form>
  );
};

export default SignUp;
