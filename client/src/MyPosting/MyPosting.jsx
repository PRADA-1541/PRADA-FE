import React, { useEffect, useState } from 'react';
import './MyPosting.scss';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { RecipeList } from '../CocktailList/CocktailList';
import Comment from '../Material/Comment/Comment';
import CocktailPreview from '../Preview/CocktailPreview_sm/CocktailPreview';
import { SlArrowDown } from 'react-icons/sl';
import DropDown from '../Material/DropDown/DropDown';
import { GetMyCommentList, GetMyCustomRecipeList, GetMyEvaluationList } from '../api/myPostingService';
import { useRecoilValue } from 'recoil';
import { isSignedInAtom } from '../recoil/atom';
import { useMediaQuery } from 'react-responsive';

const MyPosting = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [value, setValue] = useState(0);
  const [cursor, setCursor] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [comments, setComments] = useState([]);
  const [cocktailList, setCocktailList] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [sort, setSort] = useState('최근 등록순');
  const isSignedIn = useRecoilValue(isSignedInAtom);
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
    if (isSignedIn) {
      setSort(sortList[value][0]);
      getMyPosting('', 'createdAt', []);
    }
  }, [value, isSignedIn]);

  useEffect(() => {
    if (isSignedIn) getMyPosting('', sortMap[sort], []);
  }, [sort, isSignedIn]);

  const getMyPosting = (cursor, sort, propList) => {
    const prevList =
      propList !== undefined ? propList : value === 0 ? recipeList : value === 1 ? comments : cocktailList;
    switch (value) {
      case 0:
        GetMyCustomRecipeList(cursor, 15, sort, setCursor, prevList, setRecipeList);
        break;
      case 1:
        GetMyCommentList(cursor, 10, sort, setCursor, prevList, setComments);
        break;
      case 2:
        GetMyEvaluationList(cursor, 10, sort, setCursor, prevList, setCocktailList);
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
      <Box sx={{ width: '100%', margin: '2.5rem 0 1rem 0' }}>
        <Tabs value={value} textColor='inherit' variant='fullWidth' centered onChange={handleChange}>
          <Tab label='커스텀 레시피' sx={isMobile ? { fontSize: '0.8rem' } : { fontSize: '0.9rem' }} />
          <Tab label='댓글' sx={isMobile ? { fontSize: '0.8rem' } : { fontSize: '0.9rem' }} />
          <Tab label='평점' sx={isMobile ? { fontSize: '0.8rem' } : { fontSize: '0.9rem' }} />
        </Tabs>
      </Box>
      {value === 0 ? (
        <RecipeList recipeList={recipeList} />
      ) : value === 1 ? (
        comments.map((comment) => (
          <div className='myComment' key={comment.id}>
            <Comment comment={comment} />
            <div className='myCommentCocktailNameContainer'>
              <span className='myCommentCocktailKorName'>{comment.cocktailKorName}</span>
              <span className='myCommentCocktailName'>{comment.cocktailName}</span>
            </div>
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
              korName={cocktail.cocktailKorName}
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
