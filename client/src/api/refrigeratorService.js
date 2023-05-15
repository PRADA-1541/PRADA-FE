import { Refrigerator } from './api';

export const GetRefrigeratorList = async (setRefriegrators) => {
  try {
    const res = await Refrigerator.getRefrigeratorList();
    if (res) {
      setRefriegrators(res.data.result);
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

export const CreateRefrigerator = async (refrigeratorName, isMain, setRefriegrators) => {
  try {
    const res = await Refrigerator.createRefrigerator(refrigeratorName, isMain);
    if (res) {
      const refrigeratorListRes = await Refrigerator.getRefrigeratorList();
      setRefriegrators(refrigeratorListRes.data.result);
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
