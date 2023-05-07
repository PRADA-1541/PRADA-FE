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

const CocktailRecipe = () => {
  const { cocktailIdx } = useParams();
  const [cocktail, setCocktail] = useState();
  const [commentVisible, setCommentVisible] = useState(false);
  const [evalStars, setEvalStars] = useState(0);

  const comments = [
    {
      id: 1,
      name: '김철수',
      profile: 'https://avatars.githubusercontent.com/u/48292190?v=4',
      date: '2021-08-01',
      content: '맛있어요',
      like: 3,
      dislike: 2,
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

  const ingredients = [gin, strawberry, vodka, milk, tomatoJuice, sugar];

  const recipe =
    '1. Mix everything well in a cocktail shaker with some ice to make everything nice and creamy.\n2. Pour into a cocktail glass and serve.';

  useEffect(() => {
    setCocktail(data[cocktailIdx]);
  }, [cocktailIdx]);

  const commentToggle = () => {
    setCommentVisible(!commentVisible);
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
            onMouseLeave={() => setEvalStars(0)}
          />
        );
      else
        return (
          <AiOutlineStar
            className='star'
            key={idx}
            onMouseEnter={() => setEvalStars(idx + 1)}
            onMouseLeave={() => setEvalStars(0)}
          />
        );
    });
  };

  const Comments = () => {
    return comments.map((comment) => <Comment comment={comment} key={comment.id} />);
  };

  return (
    <div className='cocktailRecipeContainer'>
      <div className='dateAndProfile'>
        <span>2023.04.14</span>
        <span>김준하</span>
      </div>
      {cocktail && (
        <CocktailInfo
          name={cocktail.cocktailName}
          imageURL={cocktail.cocktailImage}
          content={cocktail.cocktailDescription}
          keywords={cocktail.cocktailKeyword}
          evaluation={cocktail.averageRating}
          // ingredients={cocktail.IngredientsURL}
          ingredients={ingredients}
          isFavorite={false}
        />
      )}
      <div className='recipe'>
        <h2 className='recipeTitle'>레시피</h2>
        <div className='recipeContent'>
          {recipe.split('\n').map((item, idx) => (
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
            1
            <Arrow />
          </span>
        </h2>
        {commentVisible && <Comments />}
      </div>
    </div>
  );
};

export default CocktailRecipe;
