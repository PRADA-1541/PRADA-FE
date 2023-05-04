import React, { useRef, useState, useEffect } from 'react';
import './RecipeForm.scss';
import PropTypes from 'prop-types';
import { newIngredientAtom } from '../../recoil/atom';
import { useResetRecoilState } from 'recoil';
import KeyWord from '../../Material/Keyword/KeyWord';
import DropDown from '../../Material/DropDown/DropDown';
import Search from '../../Material/Search/Search';
import useScrollMove from '../../hooks/useScrollMove';
import NewIngredient from './NewIngredient/NewIngredient';
import ImagePreview from '../../Material/ImagePreview/ImagePreview';

const RecipeForm = () => {
  const [isFirst, setIsFirst] = useState(true);

  const [cocktailName, setCocktailName] = useState('');
  const [cocktailDescription, setCocktailDescription] = useState('');
  const [checkedKeywords, setCheckedKeywords] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const cocktailImageRef = useRef();

  const [ingredientsNum, setIngredientsNum] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [volume, setVolume] = useState('');
  const volumeRef = useRef();
  const [unit, setUnit] = useState('');
  const [ingredientDropDown, setIngredientDropDown] = useState(false);
  const [unitDropDown, setUnitDropDown] = useState(false);
  const [newIngredient, setNewIngredient] = useState(false);
  const [newIngredientInfo, setNewIngredientInfo] = useState({});
  const [directions, setDirections] = useState('');

  const resetNewIngredientAtom = useResetRecoilState(newIngredientAtom);

  const scrollToTop = useScrollMove('top');

  const keywordsList = {
    a: ['달콤한', '시원한', '담백한', '달달한', '쓴맛', '매운맛', '신맛', '술', '맥주', '와인'],
    b: [
      '소주',
      '막걸리',
      '집에서',
      '친구와',
      '연인과',
      '가족과',
      '데이트',
      '편안한',
      '행복한',
      '힐링',
      '휴식',
      '포근한',
    ],
    c: ['봄', '여름', '가을', '겨울', '아침', '점심', '저녁', '야식', '간식'],
    d: ['술안주', '술자리', '주말', '평일', '휴일', '휴가'],
  };

  const ingredientList = [
    '다크럼',
    '다크 럼',
    '럼',
    '럼다크',
    '데킬라',
    '진',
    '보드카',
    '위스키',
    '브랜디',
    '기타',
    '오렌지',
    '레몬',
    '라임',
    '자몽',
    '토닉워터',
    '콜라',
    '사이다',
    '진저에일',
  ];
  const unitList = ['ml', 'dash', 'teaspoon', 'drops', 'gram', '개', 'slice', 'peel', 'leaves'];

  useEffect(() => {
    volumeRef.current?.focus();
  }, [volume]);

  const keywordClick = (keyword) => {
    if (!checkedKeywords.includes(keyword)) {
      if (checkedKeywords.length === 7) {
        alert('키워드는 최대 7개까지 등록 가능합니다.');
        return;
      }
      setCheckedKeywords([...checkedKeywords, keyword]);
    } else {
      setCheckedKeywords(checkedKeywords.filter((checkedKeyword) => checkedKeyword !== keyword));
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
    console.log(imageFile);
  };

  const deleteImage = () => {
    setImagePreview(null);
    setImageFile(null);
    cocktailImageRef.current.value = null;
  };

  const pageTurn = () => {
    setIsFirst(!isFirst);
    scrollToTop();
  };

  const submitRecipe = () => {
    if (cocktailName === '') {
      alert('칵테일 이름을 입력해주세요.');
      setIsFirst(true);
      return;
    }
    if (cocktailDescription === '') {
      alert('칵테일 설명을 입력해주세요.');
      setIsFirst(true);
      return;
    }
    if (checkedKeywords.length === 0) {
      alert('키워드를 1개 이상 선택해주세요.');
      setIsFirst(true);
      return;
    }
    if (ingredients.length === 0) {
      alert('재료를 1개 이상 입력해주세요.');
      return;
    }
    if (directions === '') {
      alert('레시피를 입력해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('name', cocktailName);
    formData.append('description', cocktailDescription);
    formData.append('keywords', checkedKeywords);
    if (imageFile) formData.append('image', imageFile);
    formData.append('ingredients', ingredients);
    // formData.append('directions', directions);
    // TODO: formData에 directions 추가, api 연결
    // console.log(cocktailName, cocktailDescription, checkedKeywords, imageFile, ingredients, directions);
    for (let value of formData.values()) {
      console.log(value);
    }
  };

  const addIngredient = () => {
    if (ingredientName === '' && !newIngredientInfo.name) {
      alert('재료를 입력해주세요.');
      return;
    }
    if (volume === '') {
      alert('용량을 입력해주세요.');
      return;
    }
    if (unit === '') {
      alert('단위를 입력해주세요.');
      return;
    }
    setIngredientsNum(ingredientsNum + 1);
    if (newIngredientInfo.name)
      setIngredients([
        ...ingredients,
        {
          name: newIngredientInfo.name,
          description: newIngredientInfo.description,
          category: newIngredientInfo.category,
          image: newIngredientInfo.image ?? null,
          volume: volume,
          unit: unit,
        },
      ]);
    else setIngredients([...ingredients, { name: ingredientName, volume: volume, unit: unit }]);
    setIngredientName('');
    setUnit('');
    setVolume('');
    setNewIngredientInfo({});
    setNewIngredient(false);
    resetNewIngredientAtom();
    setIngredientDropDown(false);
    setUnitDropDown(false);
  };

  const deleteIngredient = (idx) => {
    setIngredients(ingredients.filter((ingredient, index) => index !== idx));
    setIngredientsNum(ingredientsNum - 1);
  };

  const KeywordList = ({ keywordType }) => {
    return (
      <div className='keywordList'>
        <div className='keywordListHeader'>{keywordType}</div>
        <div className='keywordListBox'>
          {keywordsList[keywordType].map((keyword, idx) => {
            const isChecked = checkedKeywords.includes(keyword);
            return <KeyWord key={idx} keyword={keyword} onClick={() => keywordClick(keyword)} isChecked={isChecked} />;
          })}
        </div>
      </div>
    );
  };

  KeywordList.propTypes = {
    keywordType: PropTypes.string.isRequired,
  };

  const Required = () => {
    return <span className='requiredMark'>*</span>;
  };

  const Ingredients = () => {
    const ingredientInput = new Array(ingredientsNum).fill(0);
    return ingredientInput.map((item, idx) => {
      if (idx === ingredientsNum - 1) {
        return (
          <div className='ingredientForm' key={idx}>
            <h3>재료{idx + 1}</h3>
            <div className='ingredientSelectBtnContainer'>
              <div className='ingredientSelectBtn' onClick={() => !ingredientDropDown && setIngredientDropDown(true)}>
                {(ingredientName == '') & !newIngredientInfo.name ? '재료를 선택해주세요' : ingredientName}
                {newIngredientInfo.name}
                {ingredientDropDown && (
                  <Search
                    setSearch={setIngredientDropDown}
                    placeholder='재료를 검색해주세요'
                    setText={setIngredientName}
                    setNewIngredientInfo={setNewIngredientInfo}
                    list={ingredientList}
                  />
                )}
              </div>
              <div className='newIngredientBtn' onClick={() => setNewIngredient(!newIngredient)}>
                새로운 재료
              </div>
              <NewIngredient
                setNewIngredientInfo={setNewIngredientInfo}
                setIngredientName={setIngredientName}
                newIngredient={newIngredient}
                setNewIngredient={setNewIngredient}
              />
            </div>
            <br />
            <div className='volumeContainer'>
              <input
                className='volume'
                type='number'
                placeholder='용량'
                ref={volumeRef}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
              <div className='unit' onClick={() => !unitDropDown && setUnitDropDown(true)}>
                {unit === '' ? '단위' : unit}
                {unitDropDown && <DropDown setDropDown={setUnitDropDown} list={unitList} onClick={setUnit} />}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className='ingredientContainer' key={idx}>
            <div className='ingredientDelete' onClick={() => deleteIngredient(idx)}>
              삭제
            </div>
            <h3>재료{idx + 1}</h3>
            <div className='ingredientSelectBtn' style={{ cursor: 'default' }}>
              {ingredients[idx].name}
            </div>
            <br />
            <div className='volumeContainer'>
              <div className='unit' style={{ cursor: 'default' }}>
                {ingredients[idx].volume}
              </div>
              <div className='unit' style={{ cursor: 'default' }}>
                {ingredients[idx].unit}
              </div>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <h1>레시피 작성</h1>
      <form className='recipeFormContainer' onSubmit={(e) => e.preventDefault()}>
        {isFirst && (
          <div className='formContainer'>
            <h2>1. 칵테일 정보</h2>
            <div className='cocktailFormInfo'>
              <label htmlFor='cocktailFormName'>
                <Required /> 칵테일 이름 :
              </label>
              <input
                value={cocktailName}
                onChange={(e) => setCocktailName(e.target.value)}
                type='text'
                id='cocktailFormName'
                className='cocktailFormName'
                required
              />
              <br />
              <label htmlFor='cocktailFormDescription'>
                <Required /> 칵테일 소개
              </label>
              <br />
              <textarea
                value={cocktailDescription}
                onChange={(e) => setCocktailDescription(e.target.value)}
                id='cocktailFormDescription'
                required
              />
              <br />
              <label>
                <Required /> 칵테일 키워드
              </label>
              <br />
              {checkedKeywords.map((keyword, idx) => {
                return <KeyWord key={idx} keyword={keyword} onClick={() => keywordClick(keyword)} />;
              })}
              <div className='keywordListContainer'>
                <KeywordList keywordType='a' />
                <KeywordList keywordType='b' />
                <KeywordList keywordType='c' />
                <KeywordList keywordType='d' />
              </div>
              <br />
              <label htmlFor='cocktailFormImage'>
                칵테일 이미지
                <div className='cocktailFormImageBtn'>추가</div>
              </label>
              <input
                className='fileInput'
                type='file'
                id='cocktailFormImage'
                accept='.jpg, .jpeg, .png, .img'
                ref={cocktailImageRef}
                onChange={handleFile}
              />
              <br />
              {imagePreview && <ImagePreview imagePreview={imagePreview} deleteImage={deleteImage} />}
            </div>
          </div>
        )}
        {!isFirst && (
          <>
            <div className='formContainer'>
              <h2>2. 재료</h2>
              <Ingredients />
              <button onClick={addIngredient}>추가</button>
            </div>
            <div className='formContainer' style={{ marginTop: '2rem' }}>
              <h2>3. 레시피</h2>
              <textarea
                value={directions}
                onChange={(e) => setDirections(e.target.value)}
                placeholder='1. 믹서기에 으깬 얼음을 넣는다. &#13;&#10;2. 코코넛 밀크(또는 코코넛 크림이나 코코넛 시럽) 30ml와 파인애플 주스 120ml를 추가한다.&#13;&#10;3. 부드러워질 때까지 갈아서 허리케인 잔에 붓는다.&#13;&#10;4. 휘핑크림으로 토핑하고 웨지 파인애플과 마라스키노 체리로 장식한다.'
              />
            </div>
          </>
        )}
      </form>
      <div className='btnContainer'>
        <button onClick={pageTurn}>{isFirst ? '다음' : '이전'}</button>
        {!isFirst && (
          <button className='submitBtn' onClick={submitRecipe}>
            등록
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeForm;
