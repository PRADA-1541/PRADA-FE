import { atom } from 'recoil';

export const isSignedInAtom = atom({
  key: 'isSignedInAtom',
  default: false,
});

export const userInfoAtom = atom({
  key: 'userInfoAtom',
  default: {
    nickname: '',
    email: '',
    profileImage: '',
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
