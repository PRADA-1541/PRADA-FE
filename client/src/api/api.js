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

export const Recipe = {
  getRecipePriorInfo: () => api.get('cocktails/priorInfoToRegister'),
  uploadImg: (directory, formData) => api.post(`upload?directory=${directory}`, formData),
  uploadRecipe: (recipe) => api.post('users/custom-cocktail', recipe),
  getRecipeList: (isCustom, cursor, pageSize, orderBy) =>
    api.get(`cocktails/${isCustom}?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}`),
  getFavoriteRecipeList: (cursor, pageSize, orderBy) =>
    api.get(`cocktails/favorite?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}&userIdx=5`),
};

export const Refrigerator = {
  getRefrigeratorList: () => api.get('users/refrigerator?userIdx=5'),
  createRefrigerator: (refrigeratorName, isMain) =>
    api.post('users/refrigerator?userIdx=5', {
      refrigeratorName,
      isMain,
    }),
  deleteRefrigerator: (refrigeratorIdx) => api.delete(`users/refrigerator/${refrigeratorIdx}`),
  changeRefrigeratorName: (refrigeratorIdx, refrigeratorName) =>
    api.patch(`users/refrigerator/${refrigeratorIdx}`, {
      refrigeratorName,
    }),
  changeMainRefrigerator: (refrigeratorIdx) => api.patch(`users/refrigerator/${refrigeratorIdx}/main?userIdx=5`),
  getRefrigerator: (refrigeratorIdx) => api.get(`users/refrigerator/${refrigeratorIdx}/ingredient`),
  getIngredientList: () => api.get('ingredients'),
  addIngredient: (refrigeratorIdx, ingredientIdx) =>
    api.post(`users/refrigerator/${refrigeratorIdx}/ingredient/${ingredientIdx}`),
  deleteIngredient: (refrigeratorIdx, ingredientIdx) =>
    api.delete(`users/refrigerator/${refrigeratorIdx}/ingredient/${ingredientIdx}`),
};

export const MyPosting = {
  getMyCustomRecipeList: (cursor, pageSize, orderBy) =>
    api.get(`cocktails/create/customCocktail?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}&userIdx=5`),
  getMyCommentList: (cursor, pageSize, orderBy) =>
    api.get(`cocktails/create/cocktailComment?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}&userIdx=5`),
  getMyEvaluationList: (cursor, pageSize, orderBy) =>
    api.get(`cocktails/create/cocktailEval?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}&userIdx=5`),
};
