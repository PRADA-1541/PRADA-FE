import React, { useRef, useState, useEffect } from 'react';
import './RecipeForm.scss';
// import ingredientList from '../../assets/data/ingredients.json';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { cocktailRecipeAtom, newIngredientAtom } from '../../recoil/atom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import KeyWord from '../../Material/Keyword/KeyWord';
import DropDown from '../../Material/DropDown/DropDown';
import Search from '../../Material/Search/Search';
import useScrollMove from '../../hooks/useScrollMove';
import NewIngredient from './NewIngredient/NewIngredient';
import ImagePreview from '../../Material/ImagePreview/ImagePreview';
import { GetRecipePriorInfo, UploadRecipe, UploadImg, EditRecipe } from '../../api/recipeService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const RecipeForm = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const navigate = useNavigate();
  const location = useLocation();

  const [isFirst, setIsFirst] = useState(true);

  const [cocktailName, setCocktailName] = useState('');
  const [cocktailKorName, setCocktailKorName] = useState('');
  const [cocktailDescription, setCocktailDescription] = useState('');
  const [checkedKeywords, setCheckedKeywords] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const cocktailImageRef = useRef();

  const [ingredientsNum, setIngredientsNum] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientObject, setIngredientObject] = useState({});
  const [volume, setVolume] = useState('');
  const volumeRef = useRef();
  const [unit, setUnit] = useState('');
  const [ingredientDropDown, setIngredientDropDown] = useState(false);
  const [unitDropDown, setUnitDropDown] = useState(false);
  const [newIngredient, setNewIngredient] = useState(false);
  const [newIngredientInfo, setNewIngredientInfo] = useState({});
  const [directions, setDirections] = useState('');

  const [keywordsList, setKeywordsList] = useState({});
  const [ingredientCategory, setIngredientCategory] = useState([]);
  const [ingredientCategoryMapper, setIngredientCategoryMapper] = useState({});
  const [ingredientList, setIngredientList] = useState([]);

  const cocktailRecipe = useRecoilValue(cocktailRecipeAtom);
  const resetRecipeAtom = useResetRecoilState(cocktailRecipeAtom);

  const [cookies] = useCookies(['refresh-token']);

  const resetNewIngredientAtom = useResetRecoilState(newIngredientAtom);
  const scrollToTop = useScrollMove('top');

  useEffect(() => {
    GetRecipePriorInfo(setKeywordsList, setIngredientCategory, setIngredientList, setIngredientCategoryMapper);
  }, []);

  useEffect(() => {
    if (cookies['refresh-token'] === undefined) {
      alert('로그인이 후 이용해주세요.');
      navigate('/');
    }
  }, [cookies, navigate]);

  useEffect(() => {
    if (location.pathname.startsWith('/cocktail/edit')) {
      setCocktailName(cocktailRecipe.cocktailName);
      setCocktailKorName(cocktailRecipe.cocktailKorName);
      setCocktailDescription(cocktailRecipe.cocktailDescription);
      setCheckedKeywords(cocktailRecipe.keywords);
      setImagePreview(
        cocktailRecipe.cocktailImage ? process.env.REACT_APP_IMG_BASE_URL + cocktailRecipe.cocktailImage : null
      );
      setIngredients(
        cocktailRecipe.ingredients.map((ingredient) =>
          ingredient.ingredientIdx
            ? ingredient
            : { ...ingredient, ingredientCategoryIdx: ingredientCategoryMapper[ingredient.ingredientCategory] }
        )
      );
      setIngredientsNum(cocktailRecipe.ingredients.length + 1);
      setDirections(cocktailRecipe.cocktailDirection);
    }
  }, [location.pathname, cocktailRecipe, ingredientCategoryMapper]);

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

  const submitRecipe = async () => {
    if (cocktailKorName === '') {
      alert('칵테일 이름을 입력해주세요.');
      setIsFirst(true);
      return;
    }
    if (cocktailName === '') {
      alert('칵테일 영어 이름을 입력해주세요.');
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

    let imgUrl = cocktailRecipe.cocktailImage;
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      imgUrl = await UploadImg('Cocktail', formData);
      if (!imgUrl) {
        alert('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    const recipe = {};
    recipe.cocktailName = cocktailName;
    recipe.cocktailKorName = cocktailKorName;
    recipe.cocktailDescription = cocktailDescription;
    recipe.cocktailKeyword = checkedKeywords.join(', ');
    recipe.cocktailImage = imgUrl === '' ? null : imgUrl;
    recipe.ingredients = ingredients.filter((item) => item.ingredientIdx);
    recipe.customIngredients = ingredients.filter((item) => !item.ingredientIdx);
    recipe.cocktailDirection = directions;
    recipe.userIdx = 5;

    if (location.pathname.startsWith('/cocktail/edit')) {
      const response = await EditRecipe(cocktailRecipe.cocktailIdx, recipe);
      if (response) {
        alert('레시피가 수정되었습니다.');
        resetRecipeAtom();
        navigate(`/cocktail/${cocktailRecipe.cocktailIdx}`);
      }
    } else {
      const response = await UploadRecipe(recipe);
      if (response) {
        alert('레시피가 등록되었습니다.');
        navigate('/myPosting');
      } else {
        alert('레시피 등록에 실패했습니다.');
        return;
      }
    }
  };

  const addIngredient = () => {
    if (!ingredientObject.ingredientName && !newIngredientInfo.name) {
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
          ingredientName: newIngredientInfo.name,
          ingredientDescription: newIngredientInfo.description,
          ingredientCategoryIdx: newIngredientInfo.category,
          ingredientImage: newIngredientInfo.image ?? null,
          ingredientVolume: volume,
          volumeUnit: unit,
        },
      ]);
    else
      setIngredients([
        ...ingredients,
        {
          ingredientName: ingredientObject.ingredientName,
          ingredientIdx: ingredientObject.ingredientIdx,
          ingredientVolume: volume,
          volumeUnit: unit,
        },
      ]);
    setIngredientObject({});
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

  const KeywordListContainer = () => {
    return Object.keys(keywordsList).map((keywordType) => {
      return <KeywordList key={keywordType} keywordType={keywordType} />;
    });
  };

  const KeywordList = ({ keywordType }) => {
    return (
      <div className='keywordList'>
        <div className='keywordListHeader'>{keywordType}</div>
        <div className='keywordListBox'>
          {keywordsList[keywordType].map((keyword) => {
            const isChecked = checkedKeywords.includes(keyword.keyword);
            return (
              <KeyWord
                key={keyword.keywordIdx}
                keyword={keyword.keyword}
                onClick={() => keywordClick(keyword.keyword)}
                isChecked={isChecked}
              />
            );
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
                {!ingredientObject.ingredientName & !newIngredientInfo.name
                  ? '재료를 선택해주세요'
                  : ingredientObject.ingredientName}
                {newIngredientInfo.name}
                {ingredientDropDown && (
                  <Search
                    setSearch={setIngredientDropDown}
                    placeholder='재료를 검색해주세요'
                    setObject={setIngredientObject}
                    setNewIngredientInfo={setNewIngredientInfo}
                    list={ingredientList}
                  />
                )}
              </div>
              {!isMobile && (
                <>
                  <div className='newIngredientBtn' onClick={() => setNewIngredient(!newIngredient)}>
                    새로운 재료
                  </div>
                  <NewIngredient
                    categoryList={ingredientCategory}
                    setNewIngredientInfo={setNewIngredientInfo}
                    setIngredientObject={setIngredientObject}
                    newIngredient={newIngredient}
                    setNewIngredient={setNewIngredient}
                    ingredientCategoryMapper={ingredientCategoryMapper}
                  />
                </>
              )}
            </div>
            {!isMobile && <br />}
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
            {isMobile && (
              <div style={{ position: 'relative' }}>
                <div className='newIngredientBtn' onClick={() => setNewIngredient(!newIngredient)}>
                  새로운 재료
                </div>
                <NewIngredient
                  categoryList={ingredientCategory}
                  setNewIngredientInfo={setNewIngredientInfo}
                  setIngredientObject={setIngredientObject}
                  newIngredient={newIngredient}
                  setNewIngredient={setNewIngredient}
                  ingredientCategoryMapper={ingredientCategoryMapper}
                />
              </div>
            )}
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
              {ingredients[idx].ingredientName}
            </div>
            {!isMobile && <br />}
            <div className='volumeContainer'>
              <div className='unit' style={{ cursor: 'default' }}>
                {ingredients[idx].ingredientVolume}
              </div>
              <div className='unit' style={{ cursor: 'default' }}>
                {ingredients[idx].volumeUnit}
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
          <>
            <h2>1. 칵테일 정보</h2>
            <div className='cocktailFormInfo'>
              <label htmlFor='cocktailFormKorName'>
                <Required /> 칵테일 이름
              </label>
              <input
                value={cocktailKorName}
                onChange={(e) => setCocktailKorName(e.target.value)}
                type='text'
                id='cocktailFormKorName'
                className='cocktailFormName'
                required
              />
              <br />
              <label htmlFor='cocktailFormName'>
                <Required /> 칵테일 영어 이름
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
              <div className='keywordListContainer'>{keywordsList && <KeywordListContainer />}</div>
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
          </>
        )}
        {!isFirst && (
          <>
            <div className='formContainer'>
              <h2>2. 재료</h2>
              <Ingredients />
              <button className='ingredientAddBtn' onClick={addIngredient}>
                추가
              </button>
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
