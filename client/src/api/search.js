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
    return false;
  }
};
