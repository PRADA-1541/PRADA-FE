import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { GetKaKaoToken } from '../api/authService';
import { userInfoAtom, isSignedInAtom, didSurveyAtom } from '../recoil/atom';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [, setCookie] = useCookies(['refresh-token']);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setIsSignedIn = useSetRecoilState(isSignedInAtom);
  const navigate = useNavigate();
  const setDidSurvey = useSetRecoilState(didSurveyAtom);

  useEffect(() => {
    const urlParams = new URL(location.href).searchParams;
    const kakaoToken = urlParams.get('code');
    if (kakaoToken) GetKaKaoToken(kakaoToken, setUserInfo, setCookie, setIsSignedIn, navigate, setDidSurvey);
  }, []);

  return <></>;
};

export default SignIn;
