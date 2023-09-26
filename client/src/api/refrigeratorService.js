import { Refrigerator } from './api';

export const GetRefrigeratorList = async (setRefriegrators) => {
  try {
    const res = await Refrigerator.getRefrigeratorList();
    if (res) {
      setRefriegrators(res.data.result);
      return true;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
    return false;
  }
};

export const CreateRefrigerator = async (refrigeratorName, isMain, setRefriegrators) => {
  try {
    const res = await Refrigerator.createRefrigerator(refrigeratorName, isMain);
    if (res) {
      const refrigeratorListRes = await Refrigerator.getRefrigeratorList();
      setRefriegrators(refrigeratorListRes.data.result);
      return true;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
    return false;
  }
};

export const DeleteRefrigerator = async (refrigeratorIdx) => {
  try {
    const res = await Refrigerator.deleteRefrigerator(refrigeratorIdx);
    if (res) return true;
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
    return false;
  }
};

export const GetRefrigerator = async (refrigeratorIdx, setRefrigerator) => {
  try {
    const res = await Refrigerator.getRefrigerator(refrigeratorIdx);
    if (res) {
      setRefrigerator(res.data.result);
      return true;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
    return false;
  }
};

export const ChangeRefrigeratorName = async (refrigeratorIdx, refrigeratorName, setRefrigerator) => {
  try {
    const res = await Refrigerator.changeRefrigeratorName(refrigeratorIdx, refrigeratorName);
    if (res) {
      const refrigeratorRes = await GetRefrigerator(refrigeratorIdx, setRefrigerator);
      if (refrigeratorRes) return true;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
    return false;
  }
};

export const ChangeMainRefrigerator = async (refrigeratorIdx) => {
  try {
    const res = await Refrigerator.changeMainRefrigerator(refrigeratorIdx);
    if (res) return true;
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
    return false;
  }
};

export const GetIngredientList = async (setAllIngredientList, setIngredientList, curIngredients) => {
  try {
    const res = await Refrigerator.getIngredientList();
    if (res) {
      setAllIngredientList(res.data.result);
      setIngredientList(
        res.data.result.filter((item) => !curIngredients.find((i) => i.ingredientIdx === item.ingredientIdx))
      );
      return true;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
    return false;
  }
};

export const AddIngredient = async (refrigeratorIdx, ingredientIdx, setRefrigerator) => {
  try {
    const res = await Refrigerator.addIngredient(refrigeratorIdx, ingredientIdx);
    if (res) {
      const refrigeratorRes = await Refrigerator.getRefrigerator(refrigeratorIdx);
      if (refrigeratorRes) {
        setRefrigerator(refrigeratorRes.data.result);
        return true;
      }
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
    return false;
  }
};

export const DeleteIngredient = async (refrigeratorIdx, ingredientIdx, setRefrigerator) => {
  try {
    const res = await Refrigerator.deleteIngredient(refrigeratorIdx, ingredientIdx);
    if (res) {
      const refrigeratorRes = await Refrigerator.getRefrigerator(refrigeratorIdx);
      if (refrigeratorRes) {
        setRefrigerator(refrigeratorRes.data.result);
        return true;
      }
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    }
    return false;
  }
};
