import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: process.env.REACT_APP_API_URL_LOCAL,
});

export const SignApi = {
  sendKakaoToken: (kakaoToken) =>
    api.post('users/kakao/signin', {
      kakaoToken: kakaoToken,
    }),
};
