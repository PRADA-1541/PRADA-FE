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
    auth.post(
      'users/refresh-token/verify',
      {},
      {
        headers: {
          'x-access-token': token,
        },
      }
    ),
  sendKakaoToken: (kakaoToken) =>
    auth.post('users/kakao/signin', {
      kakaoToken,
    }),
  nicknameValid: (nickname) => auth.get(`users/nickname-valid?nickname=${nickname}`),
  signup: (email, nickname, profile) =>
    auth.post('users/signup', {
      email,
      nickname,
      profile,
    }),
};

export const UserApi = {
  getUserInfo: () => api.get('users'),
};

export const Recommendation = {
  getTodayRecommendedCocktail: (isLogin) => api.get(`/todaysRecoommendCocktail?isLogin=${isLogin}`),
  getRecommendedList: () => api.get('recommend/cocktail?userIdx=5'),
  getHotList: () => api.get('hot-cocktails'),
  getMainSortedList: (orderBy) => api.get(`recommended-cocktails?orderBy=${orderBy}`),
};

export const Recipe = {
  getRecipePriorInfo: () => api.get('cocktails/priorInfoToRegister'),
  uploadImg: (directory, formData) => api.post(`upload?directory=${directory}`, formData),
  uploadRecipe: (recipe) => api.post('cocktails/custom-cocktail', recipe),
  getRecipeList: (isCustom, cursor, pageSize, orderBy) =>
    api.get(`cocktails/${isCustom}?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}`),
  // getFavoriteRecipeList: (cursor, pageSize, orderBy) =>
  //   api.get(`cocktails/favorite?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}&userIdx=5`),
  getFavoriteRecipeList: (cursor, pageSize, orderBy) =>
    api.get(`cocktails/favorite?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}`),
  getRecipe: (cocktailIdx) => api.get(`cocktail/${cocktailIdx}`),
  editRecipe: (cocktailIdx, recipe) => api.put(`custom-cocktail/${cocktailIdx}`, recipe),
  deleteRecipe: (cocktailIdx) => api.delete(`custom-cocktail/${cocktailIdx}`),
  updateReadCount: (cocktailIdx) =>
    api.put(`cocktails/detail/readLogics`, {
      userIdx: 5,
      cocktailIdx,
    }),
  updateIsFavorite: (cocktailIdx, isFavorite) =>
    api.post(`cocktail/${cocktailIdx}/bookmark`, {
      userIdx: 5,
      isFavorite: isFavorite,
    }),
  uploadRating: (cocktailIdx, rating) =>
    api.post(`cocktail/${cocktailIdx}/user-evaluation`, {
      userIdx: 5,
      rating: rating,
    }),
  updateRating: (cocktailIdx, rating) =>
    api.patch(`cocktail/${cocktailIdx}/user-evaluation`, {
      userIdx: 5,
      rating: rating,
    }),
  getComments: (cocktailIdx) => api.get(`cocktail/${cocktailIdx}/comments?userIdx=5`),
  uploadComment: (cocktailIdx, content) => api.post(`cocktail/${cocktailIdx}/comment?userIdx=5`, { content }),
  updateComment: (commentIdx, content) => api.patch(`comment/${commentIdx}?userIdx=5`, { content }),
  deleteComment: (commentIdx) => api.delete(`comment/${commentIdx}?userIdx=5`),
  setCommentLikeState: (commentIdx, state) => api.post(`comment/${commentIdx}?userIdx=5`, { state }),
};

export const Search = {
  getSearchRecipeList: (isCustom, cursor, pageSize, orderBy, searchKey, searchValue) =>
    api.get(
      `search-cocktail/${isCustom}?pageSize=${pageSize}&orderBy=${orderBy}&cursor=${cursor}&searchKey=${searchKey}&searchValue=${searchValue}`
    ),
  getSearchIngredientList: (pageSize, cursor, value) =>
    api.get(`ingredient/search?pageSize=${pageSize}&cursor=${cursor}&value=${value}`),
};

export const Refrigerator = {
  getRefrigeratorList: () => api.get('refrigerator?userIdx=5'),
  createRefrigerator: (refrigeratorName, isMain) =>
    api.post('refrigerator?userIdx=5', {
      refrigeratorName,
      isMain,
    }),
  deleteRefrigerator: (refrigeratorIdx) => api.delete(`refrigerator/${refrigeratorIdx}`),
  changeRefrigeratorName: (refrigeratorIdx, refrigeratorName) =>
    api.patch(`refrigerator/${refrigeratorIdx}`, {
      refrigeratorName,
    }),
  changeMainRefrigerator: (refrigeratorIdx) => api.patch(`refrigerator/${refrigeratorIdx}/main?userIdx=5`),
  getRefrigerator: (refrigeratorIdx) => api.get(`refrigerator/${refrigeratorIdx}/ingredient`),
  getIngredientList: () => api.get('ingredients'),
  addIngredient: (refrigeratorIdx, ingredientIdx) =>
    api.post(`refrigerator/${refrigeratorIdx}/ingredient/${ingredientIdx}`),
  deleteIngredient: (refrigeratorIdx, ingredientIdx) =>
    api.delete(`refrigerator/${refrigeratorIdx}/ingredient/${ingredientIdx}`),
};

export const MyPosting = {
  getMyCustomRecipeList: (cursor, pageSize, orderBy) =>
    api.get(`cocktails/create/customCocktail?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}&userIdx=5`),
  getMyCommentList: (cursor, pageSize, orderBy) =>
    api.get(`cocktails/create/cocktailComment?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}&userIdx=5`),
  getMyEvaluationList: (cursor, pageSize, orderBy) =>
    api.get(`cocktails/create/cocktailEval?cursor=${cursor}&pageSize=${pageSize}&orderBy=${orderBy}&userIdx=5`),
};
