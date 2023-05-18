import axios from 'axios';

export const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: process.env.REACT_APP_API_URL_LOCAL,
});

export const auth = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: process.env.REACT_APP_API_URL_LOCAL,
});

export const Auth = {
  getKaKaoToken: (token) =>
    axios.post(
      'https://kauth.kakao.com/oauth/token',
      {
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_REST_API_KEY,
        redirect_uri: process.env.REACT_APP_SIGNIN_REDIRECT,
        code: token,
      },
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    ),
  refresh: (token) =>
    auth.post('users/refresh-token/verify', {
      token: token,
    }),
  sendKakaoToken: (kakaoToken) =>
    auth.post('users/kakao/signin', {
      kakaoToken: kakaoToken,
    }),
  nicknameValid: (nickname) => auth.get(`users/nickname-valid?nickname=${nickname}`),
  signup: (email, nickname) =>
    auth.post('users/signup', {
      email: email,
      nickname: nickname,
    }),
};

export const UserApi = {
  getUserInfo: () => api.get('users/userInfo'),
};

export const Recommendation = {
  getRecommendedList: () => api.get('cocktails/recommendedCocktail?userIdx=6'),
};

export const Recipe = {
  getRecipePriorInfo: () => api.get('cocktails/priorInfoToRegister'),
  uploadImg: (directory, formData) => api.post(`upload?directory=${directory}`, formData),
  uploadRecipe: (recipe) => api.post('users/custom-cocktail', recipe),
};

export const Refrigerator = {
  getRefrigeratorList: () => api.get('users/refrigerator?userIdx=6'),
  createRefrigerator: (refrigeratorName, isMain) =>
    api.post('users/refrigerator?userIdx=6', {
      refrigeratorName,
      isMain,
    }),
  deleteRefrigerator: (refrigeratorIdx) => api.delete(`users/refrigerator/${refrigeratorIdx}`),
  changeRefrigeratorName: (refrigeratorIdx, refrigeratorName) =>
    api.patch(`users/refrigerator/${refrigeratorIdx}`, {
      refrigeratorName,
    }),
  changeMainRefrigerator: (refrigeratorIdx) => api.patch(`users/refrigerator/${refrigeratorIdx}/main?userIdx=6`),
  getRefrigerator: (refrigeratorIdx) => api.get(`users/refrigerator/${refrigeratorIdx}/ingredient`),
  getIngredientList: () => api.get('ingredients'),
  addIngredient: (refrigeratorIdx, ingredientIdx) =>
    api.post(`users/refrigerator/${refrigeratorIdx}/ingredient/${ingredientIdx}`),
  deleteIngredient: (refrigeratorIdx, ingredientIdx) =>
    api.delete(`users/refrigerator/${refrigeratorIdx}/ingredient/${ingredientIdx}`),
};
