import React, { useEffect, useState } from 'react';
import './Refrigerator.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { refrigeratorsAtom } from '../../recoil/refrigeratorAtom';
import { Link, useNavigate } from 'react-router-dom';
// import ingredientList from '../../assets/data/ingredients.json';
// import gin from '../../assets/images/ingredients/재료_진.png';
// import strawberry from '../../assets/images/ingredients/재료_딸기.png';
// import vodka from '../../assets/images/ingredients/재료_보드카.png';
// import milk from '../../assets/images/ingredients/재료_우유.png';
// import tomatoJuice from '../../assets/images/ingredients/재료_토마토주스.png';
// import sugar from '../../assets/images/ingredients/재료_설탕.png';
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
} from '../../api/refrigeratorService';

const Refrigerator = () => {
  const { refrigeratorIdx } = useParams();
  // const refrigerator = {
  //   refrigeratorIdx: 1,
  //   refrigeratorName: '냉장고 1',
  //   isMain: 0,
  //   ingredients: [
  //     {
  //       ingredientIdx: 1,
  //       ingredientName: 'Gin',
  //       ingredientImage: gin,
  //     },
  //     {
  //       ingredientIdx: 2,
  //       ingredientName: 'Strawberry',
  //       ingredientImage: strawberry,
  //     },
  //     {
  //       ingredientIdx: 3,
  //       ingredientName: 'Vodka',
  //       ingredientImage: vodka,
  //     },
  //     {
  //       ingredientIdx: 4,
  //       ingredientName: 'Milk',
  //       ingredientImage: milk,
  //     },
  //     {
  //       ingredientIdx: 5,
  //       ingredientName: 'Tomato Juice',
  //       ingredientImage: tomatoJuice,
  //     },
  //     {
  //       ingredientIdx: 6,
  //       ingredientName: 'sugar',
  //       ingredientImage: sugar,
  //     },
  //   ],
  // };

  const [editState, setEditState] = useState(false);
  const [name, setName] = useState('');
  const [refrigerator, setRefrigerator] = useState({});
  const [ingredientList, setIngredientList] = useState([]);
  const refrigeratorList = useRecoilValue(refrigeratorsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (refrigeratorList.length === 0) {
      navigate('/refrigerator/list');
    }
    GetRefrigerator(refrigeratorIdx, setRefrigerator);
  }, [refrigeratorIdx]);

  const changeCurrentRefrigerator = (refrigeratorIdx) => {
    ChangeMainRefrigerator(refrigeratorIdx, setRefrigerator);
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
          <AiOutlineStar
            className='refrigeratorStar'
            onClick={() => changeCurrentRefrigerator(refrigerator.refrigerator?.refrigeratorIdx)}
          />
        )}
      </div>
      <div className='refrigerator'>
        <div className='ingredientList'>
          {refrigerator.ingredients ? (
            <RefrigeratorIngredient
              ingredients={refrigerator.ingredients}
              editState={editState}
              deleteIngredient={deleteIngredient}
            />
          ) : (
            // TODO: 냉장고에 재료가 없을 때 띄울 문구
            <div>냉장고에 재료를 추가해주세요.</div>
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
