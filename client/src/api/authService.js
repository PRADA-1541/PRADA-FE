import { SignApi } from './api';

export const SendKakaoToken = async (kakaoToken) => {
  try {
    const res = await SignApi.sendKakaoToken(kakaoToken);
    if (res) return true;
  } catch (err) {
    console.log(err.res);
  }
};
