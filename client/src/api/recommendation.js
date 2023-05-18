import { Recommendation } from './api';

export const RecommendedCocktail = async (setRecommendedCocktailList) => {
  try {
    const res = await Recommendation.getRecommendedList();
    if (res) {
      setRecommendedCocktailList(res.data.result);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
