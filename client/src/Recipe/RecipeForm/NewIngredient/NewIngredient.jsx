import React, { useEffect, useRef } from 'react';
import './NewIngredient.scss';
import PropTypes from 'prop-types';
import { newIngredientAtom } from '../../../recoil/atom';
import { useRecoilState } from 'recoil';
import useClickState from '../../../hooks/useClickState';
import ImagePreview from '../../../Material/ImagePreview/ImagePreview';
import { UploadImg } from '../../../api/recipeService';

const NewIngredient = ({
  categoryList,
  setNewIngredientInfo,
  setIngredientObject,
  newIngredient,
  setNewIngredient,
  ingredientCategoryMapper,
}) => {
  const ingredientImageRef = useRef();
  const [newIngredientTemp, setNewIngredientTemp] = useRecoilState(newIngredientAtom);

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

  const enroll = async () => {
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

    let imgUrl = '';
    if (newIngredientTemp.image) {
      const formData = new FormData();
      formData.append('image', newIngredientTemp.image);
      imgUrl = await UploadImg('Ingredient', formData);
      if (!imgUrl) {
        alert('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    setNewIngredientInfo({
      name: newIngredientTemp.name,
      description: newIngredientTemp.description,
      category: newIngredientTemp.category,
      image: imgUrl === '' ? null : imgUrl,
    });
    setNewIngredient(false);
    setIngredientObject({});
  };

  const Categories = () => {
    return (
      <div className='categoryContainer'>
        {categoryList.map((item, idx) => (
          <span
            className={
              newIngredientTemp.category === ingredientCategoryMapper[item] ? 'selectedCategory' : 'ingredientCategory'
            }
            onClick={() => setNewIngredientTemp({ ...newIngredientTemp, category: ingredientCategoryMapper[item] })}
            key={idx}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={newIngredient ? 'newIngredientContainer' : 'hidden'} ref={ref}>
      <h1>새로운 재료를 등록해주세요.</h1>
      <div className='ingredientNameGrid'>
        <label htmlFor='name'>재료 이름 :</label>
        <input
          type='text'
          placeholder='ex) 라임'
          id='name'
          value={newIngredientTemp.name}
          onChange={(e) => handleInput(e, 'name')}
        />
      </div>
      <div className='ingredientNameGrid'>
        <label htmlFor='description'>한 줄 소개 :</label>
        <input
          className='newIngredientDescription'
          type='text'
          placeholder='ex) 신 향이 나는 과일'
          id='description'
          value={newIngredientTemp.description}
          onChange={(e) => handleInput(e, 'description')}
        />
      </div>
      <div className='ingredientNameGrid'>
        <label>종류 : </label>
        <Categories />
      </div>
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
  categoryList: PropTypes.array.isRequired,
  setNewIngredientInfo: PropTypes.func.isRequired,
  setIngredientObject: PropTypes.func.isRequired,
  newIngredient: PropTypes.bool.isRequired,
  setNewIngredient: PropTypes.func.isRequired,
  ingredientCategoryMapper: PropTypes.object.isRequired,
};

export default NewIngredient;
