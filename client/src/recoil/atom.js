import { atom } from 'recoil';

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

export const refrigeratorsAtom = atom({
  key: 'refrigeratorsAtom',
  default: [
    {
      refrigeratorIdx: 1,
      refrigeratorName: '냉장고 1',
      isCurrent: 0,
    },
    {
      refrigeratorIdx: 2,
      refrigeratorName: '냉장고 2',
      isCurrent: 1,
    },
    {
      refrigeratorIdx: 3,
      refrigeratorName: '냉장고 3',
      isCurrent: 0,
    },
    {
      refrigeratorIdx: 4,
      refrigeratorName: '냉장고 4',
      isCurrent: 0,
    },
  ],
});
