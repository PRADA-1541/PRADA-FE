import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NicknameValid } from '../api/authService';
import './SignUp.scss';

const SignUp = () => {
  const { email } = useParams();
  const nicknameRef = useRef();
  const [validation, setValidation] = useState(false);

  const nicknameValid = async () => {
    setValidation(true);
    const nickname = nicknameRef.current.value;
    const res = await NicknameValid(nickname);
    if (!res) {
      nicknameRef.current.value = '';
      setValidation(false);
    }
  };

  const signUp = () => {
    if (nicknameRef.current.value === '') return alert('닉네임을 입력해주세요.');
    if (!validation) return alert('닉네임 중복확인을 해주세요.');
    const nickname = nicknameRef.current.value;
    console.log(email, nickname);
  };

  return (
    <form className='signupContainer' onSubmit={(e) => e.preventDefault()}>
      <h1>BOTTENDER</h1>
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
      <button type='submit' onClick={signUp}>
        회원가입
      </button>
    </form>
  );
};

export default SignUp;
