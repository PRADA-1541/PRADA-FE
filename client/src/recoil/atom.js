import { atom } from 'recoil';

export const isSignedInAtom = atom({
  key: 'isSignedInAtom',
  default: true,
});

export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: {
    userIdx: 5,
    nickname: '김준하',
    email: 'junhakjh@ajou.ac.kr',
    profileImage: null,
  },
});

export const newIngredientAtom = atom({
  key: 'newIngredientAtom',
  default: {
    name: '',
    description: '',
    category: '',
    image: null,
    imagePreview: '',
  },
});

export const cocktailRecipeAtom = atom({
  key: 'cocktailRecipeAtom',
  default: {
    cocktailIdx: 0,
    cocktailName: '',
    cocktailKorName: '',
    cocktailDescription: '',
    keywords: [],
    cocktailImage: '',
    ingredients: [],
    cocktailDirection: '',
  },
});
