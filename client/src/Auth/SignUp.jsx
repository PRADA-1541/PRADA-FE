import React from 'react';
import { useEffect } from 'react';
import { SendKakaoToken } from '../api/authService';

const SignUp = () => {
  useEffect(() => {
    const urlParams = new URL(location.href).searchParams;
    const kakaoToken = urlParams.get('code');
    SendKakaoToken(kakaoToken);
  }, []);
  return <></>;
};

export default SignUp;
