import { Recipe } from './api';

export const GetRecipePriorInfo = async (
  setKeywordsList,
  setCategoryList,
  setIngredientList,
  setIngredientCategoryMapper
) => {
  try {
    const res = await Recipe.getRecipePriorInfo();
    const { Keyword, IngredientCategory, Ingredient } = res.data.result;
    setKeywordsList(Keyword);
    setCategoryList(IngredientCategory.map((category) => category.ingredientCategory));
    setIngredientCategoryMapper(
      IngredientCategory.reduce((acc, cur) => {
        acc[cur.ingredientCategory] = cur.ingredientCategoryIdx;
        return acc;
      }, {})
    );
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
    return res.data.url;
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

export const GetRecipeList = async (isCustom, cursor, pageSize, orderBy, setCursor, prevList, setRecipeList) => {
  try {
    const res = await Recipe.getRecipeList(isCustom, cursor, pageSize, orderBy);
    setRecipeList([...prevList, ...(res.data.result.cocktails ?? [])]);
    setCursor(res.data.result.cursor?.toString());
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const GetRecipe = async (cocktailIdx, setCocktail, setRating, setEvalStars, setIsFavorite, setIngredients) => {
  try {
    const res = await Recipe.getRecipe(cocktailIdx);
    if (res) Recipe.updateReadCount(cocktailIdx);
    const { cocktail, ingredients, rating, isFavorite } = res.data.result;
    let createdAt = null;
    if (cocktail.createdAt) {
      const date = new Date(cocktail.createdAt);
      createdAt = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    setCocktail({
      cocktailIdx: cocktail.cocktailIdx,
      cocktailKorName: cocktail.cocktailKorName,
      cocktailName: cocktail.cocktailName,
      cocktailImage: cocktail.cocktailImage,
      ABV: cocktail.degree,
      cocktailDescription: cocktail.cocktailDescription,
      keywords: cocktail.cocktailKeyword.split(', '),
      averageRating: cocktail.averageRating,
      isCustom: cocktail.isCustom,
      commentCount: cocktail.commentCount,
      cocktailDirection: cocktail.cocktailDirection,
      userIdx: cocktail.userIdx ?? null,
      createdAt: createdAt ?? null,
      nickname: cocktail.nickname ?? null,
    });
    setRating(rating ?? 0);
    setEvalStars(rating ?? 0);
    setIsFavorite(isFavorite ? true : false);
    setIngredients(ingredients);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const EditRecipe = async (cocktailIdx, recipe) => {
  try {
    const res = await Recipe.editRecipe(cocktailIdx, recipe);
    if (res) return true;
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};

export const DeleteRecipe = async (cocktailIdx) => {
  try {
    const res = await Recipe.deleteRecipe(cocktailIdx);
    if (res) return true;
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};

export const GetFavoriteRecipeList = async (cursor, pageSize, orderBy, setCursor, prevList, setRecipeList) => {
  try {
    const res = await Recipe.getFavoriteRecipeList(cursor, pageSize, orderBy);
    setRecipeList([...prevList, ...res.data.result.cocktails]);
    setCursor(res.data.result.cursor?.toString());
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const UpdateIsFavorite = async (cocktailIdx, isFavorite) => {
  try {
    const res = await Recipe.updateIsFavorite(cocktailIdx, isFavorite);
    if (res) {
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};

export const UploadRating = async (cocktailIdx, rating) => {
  try {
    const res = await Recipe.uploadRating(cocktailIdx, rating);
    if (res) {
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};

export const UpdateRating = async (cocktailIdx, rating) => {
  try {
    const res = await Recipe.updateRating(cocktailIdx, rating);
    if (res) {
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};

export const GetComments = async (cocktailIdx, setComments) => {
  try {
    const res = await Recipe.getComments(cocktailIdx);
    if (res) {
      setComments(res.data.result);
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};

export const UploadComment = async (cocktailIdx, comment) => {
  try {
    const res = await Recipe.uploadComment(cocktailIdx, comment);
    if (res) {
      return true;
    }
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};

export const UpdateComment = async (commentIdx, comment) => {
  try {
    const res = await Recipe.updateComment(commentIdx, comment);
    if (res) return true;
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};

export const DeleteComment = async (commentIdx) => {
  try {
    const res = await Recipe.deleteComment(commentIdx);
    if (res) return true;
  } catch (error) {
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};

export const SetCommentLikeState = async (commentIdx, state) => {
  try {
    const res = await Recipe.setCommentLikeState(commentIdx, state);
    if (res) return true;
  } catch (error) {
    console.log(error);
    if (error.response.data) {
      if (error.response.data.message) alert(error.response.data.message);
    }
    return false;
  }
};
