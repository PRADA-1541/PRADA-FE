import { Recommendation } from './api';

export const GetTodayRecommendedCocktail = async (isLogin, setTodayRecommendedCocktail) => {
  try {
    const res = await Recommendation.getTodayRecommendedCocktail(isLogin);
    if (res) {
      setTodayRecommendedCocktail(res.data.result.cocktail[0]);
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }
    return false;
  }
};

export const RecommendedCocktail = async (setRecommendedCocktailList) => {
  try {
    const res = await Recommendation.getRecommendedList();
    if (res) {
      setRecommendedCocktailList(res.data.result);
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }
    return false;
  }
};

export const GetHotCocktail = async (setHotCocktailList, shuffle) => {
  try {
    const res = await Recommendation.getHotList();
    if (res) {
      setHotCocktailList(shuffle(res.data.result.hotCocktails));
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }
    return false;
  }
};

export const GetMainSortedList = async (setCocktailList, orderBy) => {
  try {
    const res = await Recommendation.getMainSortedList(orderBy);
    if (res) {
      setCocktailList(res.data.result);
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }
    return false;
  }
};
