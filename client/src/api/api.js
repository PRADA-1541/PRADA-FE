import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: process.env.REACT_APP_API_URL_LOCAL,
});

export const auth = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: process.env.REACT_APP_API_URL_LOCAL,
});

export const Auth = {
  getKaKaoToken: (token) =>
    axios.post('https://kauth.kakao.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_REST_API_KEY,
      redirect_uri: process.env.REACT_APP_SIGNIN_REDIRECT,
      code: token,
    }),
  refresh: (token) =>
    auth.get('user/refresh', {
      headers: {
        'x-access-token': token,
      },
    }),
  sendKakaoToken: (kakaoToken) =>
    auth.post('users/kakao/signin', {
      kakaoToken: kakaoToken,
    }),
};

export const UserApi = {
  getUserInfo: () => api.get('users/userInfo'),
};
