import { Search } from './api';

export const GetSearchRecipeList = async (
  isCustom,
  cursor,
  pageSize,
  orderBy,
  searchKey,
  searchValue,
  setCursor,
  prevList,
  setRecipeList
) => {
  try {
    const res = await Search.getSearchRecipeList(isCustom, cursor, pageSize, orderBy, searchKey, searchValue);
    setRecipeList([...prevList, ...res.data.result.cocktails]);
    setCursor(res.data.result.cursor?.toString());
    return true;
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
  }
};

export const GetSearchIngredientList = async (pageSize, cursor, value, setCursor, prevList, setIngredientList) => {
  try {
    const res = await Search.getSearchIngredientList(pageSize, cursor, value);
    setIngredientList([...prevList, ...res.data.result.ingredients]);
    setCursor(res.data.result.cursor?.toString());
    return true;
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
  }
};
