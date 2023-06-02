import React, { useEffect, useState } from 'react';
import './Main.scss';
import CocktailPreview from '../Preview/CocktailPreveiw_bg/CocktailPreview';
import CocktailList from './CocktailList/CocktailList';
import {
  GetHotCocktail,
  GetMainSortedList,
  GetTodayRecommendedCocktail,
  RecommendedCocktail,
} from '../api/recommendation';
import { useRecoilValue } from 'recoil';
import { isSignedInAtom } from '../recoil/atom';

const Main = () => {
  const [todayRecommendedCocktail, setTodayRecommendedCocktail] = useState({
    cocktailIdx: 0,
    cocktailName: '',
    cocktailKorName: '',
    cocktailDescription: '',
    cocktailImage: '',
    cocktailKeyword: '',
    averageRating: 0,
    ingredientInfo: [],
  });
  const [recommendedCocktailList, setRecommendedCocktailList] = useState([]);
  const [hotCocktailList, setHotCocktailList] = useState([]);
  const [orderByRatingList, setOrderByRatingList] = useState([]);
  const [orderByReadCountList, setOrderByViewList] = useState([]);
  const [orderByCreatedAtList, setOrderByDateList] = useState([]);
  const isSignedIn = useRecoilValue(isSignedInAtom);

  useEffect(() => {
    if (!isSignedIn) {
      GetTodayRecommendedCocktail(0, setTodayRecommendedCocktail);
      GetHotCocktail(setHotCocktailList, shuffle);
      GetMainSortedList(setOrderByRatingList, 'rating');
      GetMainSortedList(setOrderByViewList, 'readCount');
      GetMainSortedList(setOrderByDateList, 'createdAt');
    } else {
      GetTodayRecommendedCocktail(1, setTodayRecommendedCocktail);
      RecommendedCocktail(setRecommendedCocktailList, shuffle);
    }
  }, [isSignedIn]);

  const shuffle = (array) => {
    for (let index = array.length - 1; index > 0; index--) {
      const randomPosition = Math.floor(Math.random() * (index + 1));
      const temporary = array[index];
      array[index] = array[randomPosition];
      array[randomPosition] = temporary;
    }
    return array;
  };

  const Recommendation = () => {
    return recommendedCocktailList.map((cocktailList, idx) => {
      const unShuffled = [...cocktailList.cocktails.slice(0, 5)];
      const shuffled = shuffle([...cocktailList.cocktails.slice(5, 10)]).slice(0, 3);
      cocktailList.cocktails = unShuffled.concat(shuffled);
      return (
        <CocktailList
          key={idx}
          category={cocktailList.rationale + '을(를) 좋아하신다면'}
          data={cocktailList.cocktails}
        />
      );
    });
  };

  return (
    <div className='homeContainer'>
      <CocktailPreview
        cocktailIdx={todayRecommendedCocktail.cocktailIdx}
        korName={todayRecommendedCocktail.cocktailKorName}
        name={todayRecommendedCocktail.cocktailName}
        content={todayRecommendedCocktail.cocktailDescription}
        imageURL={
          todayRecommendedCocktail.cocktailImage
            ? process.env.REACT_APP_IMG_BASE_URL + todayRecommendedCocktail.cocktailImage
            : null
        }
        keywords={todayRecommendedCocktail.cocktailKeyword.split(', ')}
        evaluation={todayRecommendedCocktail.averageRating}
        ingredients={todayRecommendedCocktail.ingredientInfo}
      />
      {isSignedIn ? (
        <Recommendation />
      ) : (
        <>
          <CocktailList category='오늘의 HOT 칵테일' data={hotCocktailList.slice(0, 8)} />
          <CocktailList category='높은 평점 칵테일' data={orderByRatingList} />
          <CocktailList category='많이 조회한 칵테일' data={orderByReadCountList} />
          <CocktailList category='최근에 추가된 커스텀 칵테일' data={orderByCreatedAtList} />
        </>
      )}
    </div>
  );
};

export default Main;
