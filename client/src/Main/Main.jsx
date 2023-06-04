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
import { isSignedInAtom, didSurveyAtom } from '../recoil/atom';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const didSurvey = useRecoilValue(didSurveyAtom);
  const rationaleMapper = {
    0: ['단맛', '신맛', '쌉싸름', '짠맛', '프루티', '스파이시', '허브', '너티', '스모키', '크리미', '초콜릿', '커피'],
    1: ['진', '보드카', '럼', '테킬라', '위스키', '브랜디+와인+샴페인'],
    2: ['시트러스', '청량', '트로피컬', '스윗&크리미'],
  };

  useEffect(() => {
    if (!didSurvey) {
      navigate('/survey');
    }
  }, [didSurvey]);

  useEffect(() => {
    if (!isSignedIn) {
      GetTodayRecommendedCocktail(setTodayRecommendedCocktail);
      GetHotCocktail(setHotCocktailList, shuffle);
      GetMainSortedList(setOrderByRatingList, 'rating');
      GetMainSortedList(setOrderByViewList, 'readCount');
      GetMainSortedList(setOrderByDateList, 'createdAt');
    } else {
      GetTodayRecommendedCocktail(setTodayRecommendedCocktail);
      RecommendedCocktail(setRecommendedCocktailList, shuffle);
      GetHotCocktail(setHotCocktailList, shuffle);
      GetMainSortedList(setOrderByDateList, 'createdAt');
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
      const firstShuffled = shuffle([...cocktailList.cocktails.slice(0, 3)]);
      const secondShuffled = shuffle([...cocktailList.cocktails.slice(3, 7)]);
      const lastShuffled = shuffle([...cocktailList.cocktails.slice(7, 10)]);
      cocktailList.cocktails = firstShuffled.concat(secondShuffled).concat(lastShuffled);

      let rationale = '';
      for (let key in rationaleMapper) {
        if (rationaleMapper[key].includes(cocktailList.rationale)) rationale = key;
      }
      switch (rationale) {
        case '0':
          cocktailList.rationale = cocktailList.rationale + '한 맛의 칵테일들을 좋아하신다면';
          break;
        case '1':
          cocktailList.rationale = cocktailList.rationale + ' 기반의 칵테일들을 좋아하신다면';
          break;
        case '2':
          cocktailList.rationale = cocktailList.rationale + '한 칵테일들을 좋아하신다면';
          break;
        default:
          cocktailList.rationale = cocktailList.rationale + '을(를) 좋아하신다면';
      }
      return <CocktailList key={idx} category={cocktailList.rationale} data={cocktailList.cocktails} />;
    });
  };

  return (
    <div className='mainContainer'>
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
        <>
          <CocktailList category='오늘의 HOT 칵테일' data={hotCocktailList} />
          <Recommendation />
          <CocktailList category='최근에 추가된 커스텀 칵테일' data={orderByCreatedAtList} />
        </>
      ) : (
        <>
          <CocktailList category='오늘의 HOT 칵테일' data={hotCocktailList} />
          <CocktailList category='높은 평점 칵테일' data={orderByRatingList} />
          <CocktailList category='많이 조회한 칵테일' data={orderByReadCountList} />
          <CocktailList category='최근에 추가된 커스텀 칵테일' data={orderByCreatedAtList} />
        </>
      )}
    </div>
  );
};

export default Main;
