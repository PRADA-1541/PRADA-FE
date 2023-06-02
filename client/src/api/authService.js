import { api, Auth, UserApi } from './api';
import jwt_decode from 'jwt-decode';

export const GetKaKaoToken = async (token, setUserInfo, refreshToken, setCookie, navigate) => {
  try {
    const res = await Auth.getKaKaoToken(token);
    const accessToken = res.data.access_token;
    SendKakaoToken(accessToken, setUserInfo, refreshToken, setCookie, navigate);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const GetUserInfo = async () => {
  try {
    const res = await UserApi.getUserInfo();
    const userInfo = {
      userIdx: res.data.result.userIdx,
      nickname: res.data.result.nickname,
      email: res.data.result.email,
      profileImage: res.data.result.profile ?? null,
    };
    return userInfo;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const TokenConfig = async (token) => {
  api.defaults.headers.common['x-access-token'] = token;
  const decodedUser = jwt_decode(token);
  sessionStorage.setItem('token_exp', decodedUser.exp);
  const userInfo = await GetUserInfo();
  return userInfo;
};

export const refresh = async (refreshToken, setUserInfo, navigate) => {
  try {
    const res = await Auth.refresh(refreshToken);
    const token = res.data.result.accessToken;
    const userInfo = await TokenConfig(token);
    if (userInfo === false) {
      alert('다시 로그인해주세요.');
      return false;
    }
    setUserInfo(userInfo);
    authInterceptor(refreshToken, setUserInfo);
    if (res.data.result.didSurvey === 0) navigate('/survey');
    return token;
  } catch (error) {
    if (error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      console.log(error);
    }
    return false;
  }
};

export const authInterceptor = (refreshToken, setUserInfo) => {
  api.interceptors.request.use(
    async (config) => {
      const timestamp = new Date().getTime() / 1000;
      const exp = sessionStorage.getItem('token_exp');
      if (exp) {
        if (parseInt(exp) - timestamp < 10) {
          const token = await refresh(refreshToken, setUserInfo);
          if (token) {
            config.headers = {
              'x-access-token': token,
            };
          } else {
            throw new Error('No Token');
          }
        }
        return config;
      }
    },
    async (error) => {
      console.log(error);
      // if (error.response.data.code === 2043) {
      //   if (await refresh(cookies['refresh-token'], cookies, setUserInfo, setSignInState)) {
      //     setSignInState(true);
      //     return true;
      //   } else {
      //     return false;
      //   }
      // } else {
      //   if (error.response.data && error.response.data.message) {
      //     alert(error.response.data.message);
      //   } else {
      //     console.log(error);
      //   }
      // }
    }
  );
  // return true;
};

export const SendKakaoToken = async (kakaoToken, setUserInfo, setCookie, setIsSignedIn, navigate) => {
  try {
    const res = await Auth.sendKakaoToken(kakaoToken);
    const token = res.data.result.accessToken;
    const userInfo = await TokenConfig(token);
    if (!userInfo) {
      alert('다시 로그인해주세요.');
      return false;
    }
    setUserInfo(userInfo);
    setIsSignedIn(true);
    const refreshToken = res.data.result.refreshToken;
    const decoded_refresh = jwt_decode(refreshToken);
    const exp = new Date(decoded_refresh.exp * 1000);
    setCookie('refresh-token', refreshToken, {
      path: '/',
      secure: true,
      sameSite: 'none',
      expires: exp,
    });
    authInterceptor(refreshToken, setUserInfo);
    if (res.data.result.didSurvey === 0) navigate('/survey');
    else navigate('/');
    return true;
  } catch (error) {
    if (error.response.status === 302) {
      navigate(`/signup/${error.response.data.result.email}`);
      return false;
    }
    if (error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};

export const NicknameValid = async (nickname) => {
  try {
    const res = await Auth.nicknameValid(nickname);
    alert(res.data.message);
    return true;
  } catch (error) {
    alert(error.response.data.message);
    return false;
  }
};

export const signUp = async (email, nickname, profileImg, setUserInfo, setCookie) => {
  try {
    const res = await Auth.signup(email, nickname, profileImg);
    const token = res.data.result.accessToken;
    alert('회원가입이 완료되었습니다.');
    const userInfo = await TokenConfig(token);
    if (!userInfo) {
      alert('다시 로그인해주세요.');
      return false;
    }
    setUserInfo(userInfo);
    const decoded_refresh = jwt_decode(res.data.result.refreshToken);
    const exp = new Date(decoded_refresh.exp * 1000);
    setCookie('refresh-token', res.data.result.refreshToken, {
      path: '/',
      secure: true,
      sameSite: 'none',
      expires: exp,
    });
    authInterceptor(res.data.result.refreshToken, setUserInfo);
    return true;
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) alert(error.response.data.message);
    }
  }
};

export const ModifyUserInfo = async (nickname, profileImg, setUserInfo) => {
  try {
    const res = await UserApi.modifyUserInfo(nickname, profileImg);
    if (res) {
      const userInfo = await GetUserInfo();
      if (userInfo === false) {
        alert('다시 로그인해주세요.');
        return false;
      }
      setUserInfo(userInfo);
      alert('정보가 수정되었습니다.');
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};
