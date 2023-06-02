import React, { useEffect, useState } from 'react';
import './CocktailRecipe.scss';
import { useNavigate, useParams } from 'react-router-dom';
// import data from '../../assets/data/cocktails.json';
// import gin from '../../assets/images/ingredients/재료_진.png';
// import strawberry from '../../assets/images/ingredients/재료_딸기.png';
// import vodka from '../../assets/images/ingredients/재료_보드카.png';
// import milk from '../../assets/images/ingredients/재료_우유.png';
// import tomatoJuice from '../../assets/images/ingredients/재료_토마토주스.png';
// import sugar from '../../assets/images/ingredients/재료_설탕.png';
import { CocktailInfo } from '../../Preview/CocktailPreveiw_bg/CocktailPreview';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import Comment from '../../Material/Comment/Comment';
import Ingredient from '../../Material/Ingredient/Ingredient_bg/Ingredient';
import CommentForm from '../../Material/Comment/CommentForm/CommentForm';
import {
  DeleteComment,
  DeleteRecipe,
  GetComments,
  GetRecipe,
  UpdateIsFavorite,
  UpdateRating,
  UploadComment,
  UploadRating,
} from '../../api/recipeService';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cocktailRecipeAtom, isSignedInAtom, userInfoAtom } from '../../recoil/atom';
import { useMediaQuery } from 'react-responsive';

const CocktailRecipe = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const { cocktailIdx } = useParams();
  const [cocktail, setCocktail] = useState({
    cocktailIdx: cocktailIdx,
    cocktailKorName: '',
    cocktailName: '',
    cocktailImage: '',
    ABV: 0,
    cocktailDescription: '',
    keywords: [],
    averageRating: 0,
    isCustom: 0,
    commentCount: 0,
    cocktailDirection: '',
    createdAt: '',
    nickname: '',
  });
  const [rating, setRating] = useState(0);
  const [evalStars, setEvalStars] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [commentVisible, setCommentVisible] = useState(false);
  const [isCommentReceived, setIsCommentReceived] = useState(false);
  const [comments, setComments] = useState([]);
  const { userIdx } = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();
  const setCocktailRecipeAtom = useSetRecoilState(cocktailRecipeAtom);
  const isSignedIn = useRecoilValue(isSignedInAtom);

  useEffect(() => {
    GetRecipe(cocktailIdx, setCocktail, setRating, setEvalStars, setIsFavorite, setIngredients);
  }, [cocktailIdx, isSignedIn]);

  const editRecipe = () => {
    setCocktailRecipeAtom({
      cocktailIdx,
      cocktailName: cocktail.cocktailName,
      cocktailKorName: cocktail.cocktailKorName,
      cocktailDescription: cocktail.cocktailDescription,
      keywords: cocktail.keywords,
      cocktailImage: cocktail.cocktailImage,
      ingredients: ingredients.map((ingredient) =>
        ingredient.isNew === 1
          ? {
              ingredientName: ingredient.ingredientName,
              ingredientDescription: ingredient.ingredientDescription,
              ingredientCategory: ingredient.ingredientCategory,
              ingredientImage: ingredient.ingredientImage,
              ingredientVolume: ingredient.ingredientVolume,
              volumeUnit: ingredient.volumeUnit,
            }
          : {
              ingredientName: ingredient.ingredientName,
              ingredientIdx: ingredient.ingredientIdx,
              ingredientVolume: ingredient.ingredientVolume,
              volumeUnit: ingredient.volumeUnit,
            }
      ),
      cocktailDirection: cocktail.cocktailDirection,
    });
    navigate(`/cocktail/edit/${cocktailIdx}`);
  };

  const deleteRecipe = async () => {
    if (window.confirm('레시피를 삭제하시겠습니까?')) {
      const res = await DeleteRecipe(cocktailIdx);
      if (res) {
        alert('레시피가 삭제되었습니다.');
        navigate('/myPosting');
      }
    }
  };

  const updateFavorite = async (isFavorite) => {
    if (!isSignedIn) return alert('로그인 후 이용해주세요.');
    const res = await UpdateIsFavorite(cocktailIdx, isFavorite);
    if (res) setIsFavorite(isFavorite);
  };

  const updateRating = async (evalStars) => {
    if (!isSignedIn) return alert('로그인 후 이용해주세요.');
    if (rating === 0) {
      const res = await UploadRating(cocktailIdx, evalStars);
      if (res) setRating(evalStars);
    } else {
      const res = await UpdateRating(cocktailIdx, evalStars);
      if (res) setRating(evalStars);
    }
  };

  const commentToggle = () => {
    setCommentVisible(!commentVisible);
    if (!isCommentReceived) {
      setIsCommentReceived(true);
      GetComments(cocktailIdx, setComments);
    }
  };

  const submitComment = async (comment) => {
    if (!isSignedIn) return alert('로그인 후 이용해주세요.');
    const res = await UploadComment(cocktailIdx, comment);
    if (res) {
      setCocktail({ ...cocktail, commentCount: cocktail.commentCount + 1 });
      GetComments(cocktailIdx, setComments);
    }
  };

  const deleteComment = async (commentIdx) => {
    if (!isSignedIn) return alert('로그인 후 이용해주세요.');
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      const res = await DeleteComment(commentIdx);
      if (res) {
        alert('댓글이 삭제되었습니다.');
        setCocktail({ ...cocktail, commentCount: cocktail.commentCount - 1 });
        GetComments(cocktailIdx, setComments);
      }
    }
  };

  const Arrow = () => {
    if (commentVisible) return <SlArrowUp className='arrow' />;
    else return <SlArrowDown className='arrow' />;
  };

  const Evaluation = () => {
    const stars = new Array(5).fill(0);

    return stars.map((star, idx) => {
      if (idx < evalStars)
        return (
          <AiFillStar
            className='star'
            key={idx}
            onMouseEnter={() => setEvalStars(idx + 1)}
            onMouseLeave={() => setEvalStars(rating)}
            onClick={() => updateRating(idx + 1)}
          />
        );
      else
        return (
          <AiOutlineStar
            className='star'
            key={idx}
            onMouseEnter={() => setEvalStars(idx + 1)}
            onMouseLeave={() => setEvalStars(rating)}
            onClick={() => updateRating(idx + 1)}
          />
        );
    });
  };

  const Comments = () => {
    return comments.map((comment) => <Comment comment={comment} deleteComment={deleteComment} key={comment.id} />);
  };

  return (
    <div className='cocktailRecipeContainer'>
      {cocktail.isCustom === 1 && (
        <>
          {userIdx === cocktail.userIdx && (
            <div className='cocktailRecipeUserBtnContainer'>
              <span onClick={editRecipe}>수정</span>
              <span onClick={deleteRecipe}>삭제</span>
            </div>
          )}
          <div className='dateAndProfile'>
            <span>{cocktail.createdAt}</span>
            <span>{cocktail.nickname}</span>
          </div>
        </>
      )}
      {cocktail && (
        <CocktailInfo
          ABV={cocktail.ABV}
          cocktailIdx={cocktail.cocktailIdx}
          korName={cocktail.cocktailKorName}
          name={cocktail.cocktailName}
          imageURL={cocktail.cocktailImage ? process.env.REACT_APP_IMG_BASE_URL + cocktail.cocktailImage : null}
          content={cocktail.cocktailDescription}
          keywords={cocktail.keywords}
          evaluation={cocktail.averageRating}
          ingredients={ingredients}
          isFavorite={isFavorite}
          updateFavorite={updateFavorite}
        />
      )}
      {!isMobile && (
        <div className='recipeIngredients'>
          <h2 className='recipeIngredientsTitle'>재료</h2>
          <div className='recipeIngredientsContent'>
            {ingredients.map((ingredient) => (
              <Ingredient ingredient={ingredient} key={ingredient.ingredientIdx} />
            ))}
          </div>
        </div>
      )}
      <div className='recipe'>
        <h2 className='recipeTitle'>레시피</h2>
        <div className='recipeContent'>
          {cocktail.cocktailDirection.split('\n').map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      </div>
      <div className='evaluation'>
        <span className='evaluationTitle'>평가</span>
        <Evaluation />
      </div>
      <div className='comment'>
        <h2 className='commentTitle'>
          댓글
          <span className='commentNum' onClick={commentToggle}>
            {cocktail.commentCount}
            <Arrow />
          </span>
        </h2>
        {isSignedIn && commentVisible && <CommentForm submitComment={submitComment} />}
        {commentVisible && <Comments />}
      </div>
    </div>
  );
};

export default CocktailRecipe;
