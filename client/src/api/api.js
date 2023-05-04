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
