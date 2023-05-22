import React, { useEffect, useState } from 'react';
import './MyPosting.scss';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import data from '../assets/data/cocktails.json';
import { RecipeList } from '../CocktailList/CocktailList';
import Comment from '../Material/Comment/Comment';
import CocktailPreview from '../Preview/CocktailPreview_sm/CocktailPreview';
import { SlArrowDown } from 'react-icons/sl';
import DropDown from '../Material/DropDown/DropDown';
import { GetMyCommentList, GetMyCustomRecipeList, GetMyEvaluationList } from '../api/myPostingService';

const MyPosting = () => {
  const [value, setValue] = useState(0);

  // const comments = [
  //   {
  //     id: 1,
  //     name: '김철수',
  //     profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
  //     date: '2021-08-01',
  //     content: '맛있어요',
  //     like: 3,
  //     dislike: 2,
  //     cocktailName: 'Alexander',
  //   },
  //   {
  //     id: 2,
  //     name: '김영희',
  //     profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
  //     date: '2021-08-01',
  //     content:
  //       '맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥',
  //     like: 45,
  //     dislike: 2,
  //     cocktailName: 'Amaretto Sour',
  //   },
  //   {
  //     id: 3,
  //     name: '김영희',
  //     profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
  //     date: '2021-08-01',
  //     content: '맛있어요',
  //     like: 45,
  //     dislike: 2,
  //     cocktailName: 'Americano',
  //   },
  //   {
  //     id: 4,
  //     name: '김영희',
  //     profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
  //     date: '2021-08-01',
  //     content: '맛있어요',
  //     like: 45,
  //     dislike: 25,
  //     cocktailName: 'Angel Face',
  //   },
  //   {
  //     id: 5,
  //     name: '김영희',
  //     profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
  //     date: '2021-08-01',
  //     content: '맛있어요',
  //     like: 45,
  //     dislike: 2,
  //     cocktailName: 'B-52',
  //   },
  // ];

  const [cursor, setCursor] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [comments, setComments] = useState([]);
  const [cocktailList, setCocktailList] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [sort, setSort] = useState('최근 등록순');
  const recipeSortList = ['최근 등록순', '평점순', '조회순'];
  const commentSortList = ['최근 등록순', '공감순', '비공감순'];
  const evaluationSortList = ['최근 등록순', '평점순'];
  const sortList = [recipeSortList, commentSortList, evaluationSortList];
  const sortMap = {
    '최근 등록순': 'createdAt',
    평점순: 'rating',
    조회순: 'readCount',
    공감순: 'likes',
    비공감순: 'dislikes',
  };

  useEffect(() => {
    setSort(sortList[value][0]);
    getMyPosting('', 'createdAt', []);
  }, [value]);

  useEffect(() => {
    getMyPosting('', sortMap[sort], []);
  }, [sort]);

  const getMyPosting = (cursor, sort, propList) => {
    const prevList =
      propList !== undefined ? propList : value === 0 ? recipeList : value === 1 ? comments : cocktailList;
    switch (value) {
      case 0:
        GetMyCustomRecipeList(cursor, 12, sort, setCursor, prevList, setRecipeList);
        break;
      case 1:
        GetMyCommentList(cursor, 10, sort, setCursor, prevList, setComments);
        break;
      case 2:
        GetMyEvaluationList(cursor, 8, sort, setCursor, prevList, setCocktailList);
        break;
      default:
        break;
    }
  };

  const handleSort = (e) => {
    e.stopPropagation();
    setDropDown(!dropDown);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ position: 'relative' }}>
      <h1>내가 작성한 글/평점</h1>
      <div className='sort'>
        <div className='curSort' onMouseDown={(e) => handleSort(e)}>
          {sort}
          <SlArrowDown />
        </div>
        {dropDown && <DropDown setDropDown={setDropDown} list={sortList[value]} onClick={setSort} />}
      </div>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} textColor='inherit' variant='fullWidth' centered onChange={handleChange}>
          <Tab label='커스텀 레시피' sx={{ fontSize: '0.8rem' }} />
          <Tab label='댓글' sx={{ fontSize: '0.8rem' }} />
          <Tab label='평점' sx={{ fontSize: '0.8rem' }} />
        </Tabs>
      </Box>
      {value === 0 ? (
        <RecipeList recipeList={recipeList} />
      ) : value === 1 ? (
        comments.map((comment) => (
          <div className='myComment' key={comment.id}>
            <Comment comment={comment} />
            <span>{comment.cocktailName}</span>
          </div>
        ))
      ) : (
        <div className='myRating'>
          {cocktailList.map((cocktail) => (
            <CocktailPreview
              key={cocktail.cocktailIdx}
              cocktailIdx={cocktail.cocktailIdx}
              imageURL={cocktail.cocktailImage}
              name={cocktail.cocktailName}
              evaluation={cocktail.rating}
            />
          ))}
        </div>
      )}
      {cursor && (
        <div className='moreList'>
          <SlArrowDown onClick={() => getMyPosting(cursor, sortMap[sort])} />
        </div>
      )}
    </div>
  );
};

export default MyPosting;
