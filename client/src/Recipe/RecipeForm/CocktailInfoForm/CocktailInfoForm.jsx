import React, { useRef, useState } from 'react';
import './CocktailInfoForm.scss';
import PropTypes from 'prop-types';
import KeyWord from '../../Material/Keyword/KeyWord';
import { TiDelete } from 'react-icons/ti';

const CocktailInfoForm = () => {
  const cocktailImageRef = useRef();
  const [cocktailName, setCocktailName] = useState('');
  const [cocktailDescription, setCocktailDescription] = useState('');
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

  const [checkedKeywords, setCheckedKeywords] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isFirst, setIsFirst] = useState(true);

  const keywordClick = (keyword) => {
    if (!checkedKeywords.includes(keyword)) {
      setCheckedKeywords([...checkedKeywords, keyword]);
      console.log(checkedKeywords);
    } else {
      setCheckedKeywords(checkedKeywords.filter((checkedKeyword) => checkedKeyword !== keyword));
      console.log(checkedKeywords);
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
    if (isFirst) {
      if (!cocktailName || !cocktailDescription || checkedKeywords.length === 0) {
        alert('필수 입력 사항을 입력해주세요.');
        return;
      }
    }
    setIsFirst(!isFirst);
  };

  const KeywordList = ({ keywordType }) => {
    return (
      <div className='keywordList'>
        <div className='keywordListHeader'>{keywordType}</div>
        <div className='keywordListBox'>
          {keywordsList[keywordType].map((keyword, idx) => {
            return <KeyWord key={idx} keyword={keyword} onClick={() => keywordClick(keyword)} />;
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

  const ImagePreview = () => {
    return (
      <div className='imagePreview'>
        <img className='cocktailPreview' src={imagePreview} alt='cocktail image' />
        <TiDelete className='deleteBtn' onClick={deleteImage} />
      </div>
    );
  };

  return (
    <>
      {isFirst && (
        <div className='cocktailInfoFormContainer'>
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
            {imagePreview && <ImagePreview />}
            <button className='pageBtn' onClick={pageTurn}>
              다음
            </button>
          </div>
        </div>
      )}
      {!isFirst && (
    </>
  );
};

export default CocktailInfoForm;
