import { Recipe } from './api';

export const GetRecipePriorInfo = async (setKeywordsList, setUnitList, setIngredientList) => {
  try {
    const res = await Recipe.getRecipePriorInfo();
    const { Keyword, IngredientCategory, Ingredient } = res.data.result;
    setKeywordsList(Keyword);
    setUnitList(IngredientCategory);
    setIngredientList(Ingredient);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const UploadImg = async (directory, formData) => {
  try {
    const res = await Recipe.uploadImg(directory, formData);
    return process.env.REACT_APP_IMG_BASE_URL + res.data.url;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const UploadRecipe = async (recipe) => {
  try {
    const res = await Recipe.uploadRecipe(recipe);
    if (res) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
