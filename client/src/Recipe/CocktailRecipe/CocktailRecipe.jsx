import React, { useEffect, useState } from 'react';
import './CocktailRecipe.scss';
import { useParams } from 'react-router-dom';
import data from '../../assets/data/cocktails.json';
import gin from '../../assets/images/ingredients/재료_진.png';
import strawberry from '../../assets/images/ingredients/재료_딸기.png';
import vodka from '../../assets/images/ingredients/재료_보드카.png';
import milk from '../../assets/images/ingredients/재료_우유.png';
import tomatoJuice from '../../assets/images/ingredients/재료_토마토주스.png';
import sugar from '../../assets/images/ingredients/재료_설탕.png';
import { CocktailInfo } from '../../Preview/CocktailPreveiw_bg/CocktailPreview';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import Comment from '../../Material/Comment/Comment';
import Ingredient from '../../Material/Ingredient/Ingredient_bg/Ingredient';
import CommentForm from '../../Material/Comment/CommentForm/CommentForm';

const CocktailRecipe = () => {
  const { cocktailIdx } = useParams();
  const [cocktail, setCocktail] = useState();
  const [evalStars, setEvalStars] = useState(0);
  const [isCustom, setIsCustom] = useState(0);
  const [isFavorite, setIsFavorite] = useState(0);
  const [createdAt, setCreatedAt] = useState('');
  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState(0);
  const [cocktailDirection, setCocktailDirection] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [commentVisible, setCommentVisible] = useState(false);
  const [isCommentReceived, setIsCommentReceived] = useState(false);

  const comments = [
    {
      cocktailCommentIdx: 1,
      nickname: '김철수',
      profileImg: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      cocktailCommentCreatedAt: '2021-08-01',
      cocktailComment: '맛있어요',
      cocktailCommentLikes: 3,
      cocktailCommentDisLikes: 2,
    },
    // {
    //   id: 2,
    //   name: '김영희',
    //   profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
    //   date: '2021-08-01',
    //   content:
    //     '맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥 맛있어요 맛없어요 그냥그래요 흥',
    //   like: 45,
    //   dislike: 2,
    // },
    // {
    //   id: 3,
    //   name: '김영희',
    //   profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
    //   date: '2021-08-01',
    //   content: '맛있어요',
    //   like: 45,
    //   dislike: 2,
    // },
    // {
    //   id: 4,
    //   name: '김영희',
    //   profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
    //   date: '2021-08-01',
    //   content: '맛있어요',
    //   like: 45,
    //   dislike: 25,
    // },
    // {
    //   id: 5,
    //   name: '김영희',
    //   profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
    //   date: '2021-08-01',
    //   content: '맛있어요',
    //   like: 45,
    //   dislike: 2,
    // },
  ];

  // const ingredients = [gin, strawberry, vodka, milk, tomatoJuice, sugar];
  const ingredients = [
    {
      ingredientIdx: 1,
      ingredientImage: gin,
      ingredientName: '진',
      Volume: 30,
      volumeUnit: 'ml',
      ingredientDescription:
        '증류주의 한 종류. 알코올 도수는 대개 40도 이상이며 주로 칵테일을 제조하는 데 많이 쓰인다.',
    },
    {
      ingredientIdx: 2,
      ingredientImage: strawberry,
      ingredientName: '딸기',
      Volume: 1,
      volumeUnit: 'slice',
      ingredientDescription: '딸기는 쌍떡잎식물의 이판화군 장미목 장미과의 여러해살이풀 혹은 그 열매를 가리킨다.',
    },
    {
      ingredientIdx: 3,
      ingredientImage: vodka,
      ingredientName: '보드카',
      Volume: 10,
      volumeUnit: 'ml',
      ingredientDescription:
        '보드카는 증류주의 한 종류. 알코올 도수는 대개 40도 이상이며 주로 칵테일을 제조하는 데 많이 쓰인다.',
    },
    {
      ingredientIdx: 4,
      ingredientImage: milk,
      ingredientName: '우유',
      Volume: 20,
      volumeUnit: 'ml',
      ingredientDescription: '우유는 유제품의 일종으로, 유제품은 유당을 함유하고 있는 동물의 젖을 가공한 것을 말한다.',
    },
    {
      ingredientIdx: 5,
      ingredientImage: tomatoJuice,
      ingredientName: '토마토 주스',
      Volume: 20,
      volumeUnit: 'ml',
      ingredientDescription: '토마토 주스는 토마토를 원료로 만든 주스이다.',
    },
    {
      ingredientIdx: 6,
      ingredientImage: sugar,
      ingredientName: '설탕',
      Volume: 1,
      volumeUnit: 'tea Spoon',
      ingredientDescription:
        '사탕수수나, 사탕무, 사탕단풍, 야자수, 사탕옥수수 등의 즙이나 진액을 정제하면 나오는 가루 형태의 감미료로 주로 단맛을 내는 데 쓰인다.',
    },
  ];

  const recipe =
    '1. Mix everything well in a cocktail shaker with some ice to make everything nice and creamy.\n2. Pour into a cocktail glass and serve.';

  useEffect(() => {
    setCocktail(data[cocktailIdx]);

    //TODO: 서버에서 받아오기
    setIsCustom(1);
    setIsFavorite(1);
    setCreatedAt('2021-08-01');
    setNickname('김준하');
    setRating(4);
    setEvalStars(4);
    setCocktailDirection(recipe);
    setCommentCount(5);
  }, [cocktailIdx]);

  const commentToggle = () => {
    setCommentVisible(!commentVisible);
    if (!isCommentReceived) {
      setIsCommentReceived(true);
      //TODO: 댓글 받아오기
    }
  };

  const submitComment = (comment) => {
    console.log(comment);
    //TODO: 댓글 서버에 보내기, 성공하면 댓글 리스트 다시 받아옴
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
            onClick={() => setRating(idx + 1)}
          />
        );
      else
        return (
          <AiOutlineStar
            className='star'
            key={idx}
            onMouseEnter={() => setEvalStars(idx + 1)}
            onMouseLeave={() => setEvalStars(rating)}
            onClick={() => setRating(idx + 1)}
          />
        );
    });
  };

  const Comments = () => {
    return comments.map((comment) => <Comment comment={comment} key={comment.cocktailCommentIdx} />);
  };

  return (
    <div className='cocktailRecipeContainer'>
      {isCustom === 1 && (
        <div className='dateAndProfile'>
          <span>{createdAt}</span>
          <span>{nickname}</span>
        </div>
      )}
      {cocktail && (
        <CocktailInfo
          ABV={cocktail.ABV}
          cocktailIdx={cocktail.cocktailIdx}
          name={cocktail.cocktailName}
          imageURL={cocktail.cocktailImage}
          content={cocktail.cocktailDescription}
          keywords={cocktail.cocktailKeyword}
          evaluation={cocktail.averageRating}
          isFavorite={isFavorite}
        />
      )}
      <div className='recipeIngredients'>
        <h2 className='recipeIngredientsTitle'>재료</h2>
        <div className='recipeIngredientsContent'>
          {ingredients.map((ingredient) => (
            <Ingredient ingredient={ingredient} key={ingredient.ingredientIdx} />
          ))}
        </div>
      </div>
      <div className='recipe'>
        <h2 className='recipeTitle'>레시피</h2>
        <div className='recipeContent'>
          {cocktailDirection.split('\n').map((item, idx) => (
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
            {commentCount}
            <Arrow />
          </span>
        </h2>
        {commentVisible && <CommentForm submitComment={submitComment} />}
        {commentVisible && <Comments />}
      </div>
    </div>
  );
};

export default CocktailRecipe;
