import { atom } from 'recoil';

export const isSignedInAtom = atom({
  key: 'isSignedInAtom',
  default: false,
});

export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: {
    userIdx: 0,
    nickname: '',
    email: '',
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
