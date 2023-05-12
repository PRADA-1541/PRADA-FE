import React, { useState } from 'react';
import './MyPosting.scss';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import data from '../assets/data/cocktails.json';
import { RecipeList } from '../CocktailList/CocktailList';
import Comment from '../Material/Comment/Comment';
import CocktailPreview from '../Preview/CocktailPreview_sm/CocktailPreview';

const MyPosting = () => {
  const [value, setValue] = useState(0);

  const comments = [
    {
      id: 1,
      name: '김철수',
      profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      date: '2021-08-01',
      content: '맛있어요',
      like: 3,
      dislike: 2,
      cocktailName: 'Alexander',
    },
    {
      id: 2,
      name: '김영희',
      profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      date: '2021-08-01',
      content:
        '맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥',
      like: 45,
      dislike: 2,
      cocktailName: 'Amaretto Sour',
    },
    {
      id: 3,
      name: '김영희',
      profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      date: '2021-08-01',
      content: '맛있어요',
      like: 45,
      dislike: 2,
      cocktailName: 'Americano',
    },
    {
      id: 4,
      name: '김영희',
      profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      date: '2021-08-01',
      content: '맛있어요',
      like: 45,
      dislike: 25,
      cocktailName: 'Angel Face',
    },
    {
      id: 5,
      name: '김영희',
      profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      date: '2021-08-01',
      content: '맛있어요',
      like: 45,
      dislike: 2,
      cocktailName: 'B-52',
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Materials = () => {
    switch (value) {
      case 0:
        return <RecipeList recipeList={data} />;
      case 1:
        return comments.map((comment) => (
          <div className='myComment' key={comment.id}>
            <Comment comment={comment} />
            <span>{comment.cocktailName}</span>
          </div>
        ));
      case 2:
        return (
          <div className='myRating'>
            {data.map((cocktail) => (
              <CocktailPreview
                key={cocktail.cocktailIdx}
                imageURL={cocktail.cocktailImage}
                name={cocktail.cocktailName}
                evaluation={cocktail.averageRating}
              />
            ))}
          </div>
        );
      default:
        return;
    }
  };

  return (
    <>
      <h1>내가 작성한 글/평점</h1>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} textColor='inherit' variant='fullWidth' centered onChange={handleChange}>
          <Tab label='커스텀 레시피' />
          <Tab label='댓글' />
          <Tab label='평점' />
        </Tabs>
      </Box>
      <Materials />
    </>
  );
};

export default MyPosting;
