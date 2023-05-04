import React, { useEffect, useRef } from 'react';
import './NewIngredient.scss';
import PropTypes from 'prop-types';
import { newIngredientAtom } from '../../../recoil/atom';
import { useRecoilState } from 'recoil';
import useClickState from '../../../hooks/useClickState';
import ImagePreview from '../../../Material/ImagePreview/ImagePreview';

const NewIngredient = ({ setNewIngredientInfo, setIngredientName, newIngredient, setNewIngredient }) => {
  const ingredientImageRef = useRef();
  const [newIngredientTemp, setNewIngredientTemp] = useRecoilState(newIngredientAtom);
  const categoryList = ['#Spirits', '#Liqueur', '#Drinks', '#Garnish', '#Syrup', '#Ingreidents'];

  const [ref, handleClickOutside] = useClickState(setNewIngredient);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleInput = (e, type) => {
    setNewIngredientTemp({ ...newIngredientTemp, [type]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setNewIngredientTemp({ ...newIngredientTemp, imagePreview: URL.createObjectURL(file), image: file });
  };

  const deleteImage = () => {
    setNewIngredientTemp({ ...newIngredientTemp, imagePreview: '', image: null });
    ingredientImageRef.current.value = null;
  };

  const enroll = () => {
    if (!newIngredientTemp.name) {
      alert('재료 이름을 입력해주세요.');
      return;
    }
    if (!newIngredientTemp.description) {
      alert('재료 설명을 입력해주세요.');
      return;
    }
    if (!newIngredientTemp.category) {
      alert('재료 카테고리를 선택해주세요.');
      return;
    }
    setNewIngredientInfo({
      name: newIngredientTemp.name,
      description: newIngredientTemp.description,
      category: newIngredientTemp.category,
      image: newIngredientTemp.image,
    });
    setNewIngredient(false);
    setIngredientName('');
  };

  const Categories = () => {
    return categoryList.map((item) => (
      <span
        className={newIngredientTemp.category === item ? 'selectedCategory' : 'ingredientCategory'}
        onClick={() => setNewIngredientTemp({ ...newIngredientTemp, category: item })}
        key={item}
      >
        {item}
      </span>
    ));
  };

  return (
    <div className={newIngredient ? 'newIngredientContainer' : 'hidden'} ref={ref}>
      <h1>새로운 재료를 등록해주세요.</h1>
      <label htmlFor='name'>재료 이름 :</label>
      <input
        type='text'
        placeholder='ex) 라임'
        id='name'
        value={newIngredientTemp.name}
        onChange={(e) => handleInput(e, 'name')}
      />
      <br />
      <label htmlFor='description'>한 줄 소개 :</label>
      <input
        className='newIngredientDescription'
        type='text'
        placeholder='ex) 신 향이 나는 과일'
        id='description'
        value={newIngredientTemp.description}
        onChange={(e) => handleInput(e, 'description')}
      />
      <br />
      <label>종류 : </label>
      <Categories />
      <br />
      <br />
      <label htmlFor='ingredientImage'>
        재료 이미지
        <div className='cocktailFormImageBtn'>추가</div>
      </label>
      <input
        className='fileInput'
        type='file'
        id='ingredientImage'
        accept='.jpg, .jpeg, .png, .img'
        ref={ingredientImageRef}
        onChange={handleFile}
      />
      <br />
      {newIngredientTemp.imagePreview !== '' && (
        <ImagePreview imagePreview={newIngredientTemp.imagePreview} deleteImage={deleteImage} />
      )}
      <div className='newIngredientEnroll' onClick={enroll}>
        등록
      </div>
    </div>
  );
};

NewIngredient.propTypes = {
  setNewIngredientInfo: PropTypes.func.isRequired,
  setIngredientName: PropTypes.func.isRequired,
  newIngredient: PropTypes.bool.isRequired,
  setNewIngredient: PropTypes.func.isRequired,
};

export default NewIngredient;
