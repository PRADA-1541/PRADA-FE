import { MyPosting } from './api';

export const GetMyCustomRecipeList = async (cursor, pageSize, orderBy, setCursor, prevList, setRecipeList) => {
  try {
    const res = await MyPosting.getMyCustomRecipeList(cursor, pageSize, orderBy);
    setRecipeList([...prevList, ...res.data.result.cocktails]);
    setCursor(res.data.result.cursor?.toString());
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const GetMyCommentList = async (cursor, pageSize, orderBy, setCursor, prevList, setComments) => {
  try {
    const res = await MyPosting.getMyCommentList(cursor, pageSize, orderBy);
    setComments([...prevList, ...res.data.result.comments]);
    setCursor(res.data.result.cursor?.toString());
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const GetMyEvaluationList = async (cursor, pageSize, orderBy, setCursor, prevList, setEvaluations) => {
  try {
    const res = await MyPosting.getMyEvaluationList(cursor, pageSize, orderBy);
    setEvaluations([...prevList, ...res.data.result.cocktailEvals]);
    setCursor(res.data.result.cursor?.toString());
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
