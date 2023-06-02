import React, { useEffect, useState } from 'react';
import './Refrigerator.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useRecoilValue, useRecoilState } from 'recoil';
import { refrigeratorsAtom } from '../../recoil/refrigeratorAtom';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../../Material/Search/Search';
import RefrigeratorIngredient from '../../Material/Ingredient/RefrigeratorIngredient/RefrigeratorIngredient';
import { useParams } from 'react-router-dom';
import {
  AddIngredient,
  ChangeRefrigeratorName,
  DeleteIngredient,
  GetIngredientList,
  GetRefrigerator,
  DeleteRefrigerator,
  ChangeMainRefrigerator,
  GetRefrigeratorList,
} from '../../api/refrigeratorService';
import { isSignedInAtom } from '../../recoil/atom';

const Refrigerator = () => {
  const { refrigeratorIdx } = useParams();

  const [editState, setEditState] = useState(false);
  const [name, setName] = useState('');
  const [refrigerator, setRefrigerator] = useState({
    refrigerator: {},
    ingredients: [],
  });
  const [ingredientList, setIngredientList] = useState([]);
  const [refrigeratorList, setRefrigeratorList] = useRecoilState(refrigeratorsAtom);
  const isSignedIn = useRecoilValue(isSignedInAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      GetRefrigeratorList(setRefrigeratorList);
      GetRefrigerator(refrigeratorIdx, setRefrigerator);
    }
  }, [refrigeratorIdx, isSignedIn]);

  const changeCurrentRefrigerator = async () => {
    const result = await ChangeMainRefrigerator(refrigeratorIdx);
    if (result) GetRefrigerator(refrigeratorIdx, setRefrigerator);
  };

  const startEditing = async () => {
    const res = await GetIngredientList(setIngredientList);
    if (!res) return;
    else {
      setEditState(true);
      setName(refrigerator.refrigerator.refrigeratorName);
    }
  };

  const stopEditing = async () => {
    if (name !== refrigerator.refrigerator.refrigeratorName) {
      const res = await ChangeRefrigeratorName(refrigeratorIdx, name, setRefrigerator);
      if (res) setEditState(false);
      else return;
    } else setEditState(false);
  };

  const onRemove = async () => {
    if (window.confirm('정말 삭제합니까?')) {
      const res = await DeleteRefrigerator(refrigeratorIdx);
      if (res) {
        alert('삭제되었습니다.');
        navigate('/refrigerator/list');
      } else return;
    } else {
      return;
    }
  };

  const addIngredient = (item) => {
    if (refrigerator.ingredients.find((ingredient) => ingredient.ingredientIdx === item.ingredientIdx)) {
      alert('이미 추가된 재료입니다.');
      return;
    }
    AddIngredient(refrigeratorIdx, item.ingredientIdx, setRefrigerator);
  };

  const deleteIngredient = (item) => {
    DeleteIngredient(refrigeratorIdx, item.ingredientIdx, setRefrigerator);
  };

  const RefrigeratorList = () => {
    return (
      <ul className='refrigeratorLinkList'>
        {refrigeratorList.map((refrigerator) => (
          <Link key={refrigerator.refrigeratorIdx} to={`/refrigerator/${refrigerator.refrigeratorIdx}`}>
            <li className={refrigerator.refrigeratorIdx === parseInt(refrigeratorIdx) ? 'currentList' : ''}>
              {refrigerator.refrigeratorName}
            </li>
          </Link>
        ))}
      </ul>
    );
  };

  return (
    <div className='refrigeratorBox'>
      <RefrigeratorList />
      <div className='refrigeratorName'>
        {editState ? (
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          <h1>{refrigerator.refrigerator?.refrigeratorName}</h1>
        )}
        {refrigerator.refrigerator?.isMain === 1 ? (
          <AiFillStar className='refrigeratorStar' onClick={(e) => e.preventDefault()} />
        ) : (
          <AiOutlineStar className='refrigeratorStar' onClick={changeCurrentRefrigerator} />
        )}
      </div>
      <div className='refrigerator'>
        <div className={refrigerator.ingredients.length !== 0 ? 'ingredientList' : 'emptyRefrigerator'}>
          {(refrigerator.ingredients.length !== 0) | editState ? (
            <RefrigeratorIngredient
              ingredients={refrigerator.ingredients}
              editState={editState}
              deleteIngredient={deleteIngredient}
            />
          ) : (
            <div className='emptyRefrigeratorText'>
              냉장고가 비어있습니다. 우측 하단의 수정 버튼을 눌러 재료를 추가해주세요.
            </div>
          )}
        </div>
        <div className='searchForRefrigerator'>
          {editState && <Search placeholder='재료를 검색해주세요.' setObject={addIngredient} list={ingredientList} />}
        </div>
      </div>
      <div className='buttonContainer'>
        {editState ? (
          <button onClick={stopEditing}>완료</button>
        ) : (
          <>
            <button className='deleteRefrigerator' onClick={onRemove}>
              삭제
            </button>
            <button onClick={startEditing}>수정</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Refrigerator;
