import React, { useState } from 'react';
import './Refrigerator.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { refrigeratorsAtom } from '../../recoil/atom';
import { Link, useNavigate } from 'react-router-dom';
import ingredientList from '../../assets/data/ingredients.json';
import gin from '../../assets/images/ingredients/재료_진.png';
import strawberry from '../../assets/images/ingredients/재료_딸기.png';
import vodka from '../../assets/images/ingredients/재료_보드카.png';
import milk from '../../assets/images/ingredients/재료_우유.png';
import tomatoJuice from '../../assets/images/ingredients/재료_토마토주스.png';
import sugar from '../../assets/images/ingredients/재료_설탕.png';
import Search from '../../Material/Search/Search';
import RefrigeratorIngredient from '../../Material/Ingredient/RefrigeratorIngredient/RefrigeratorIngredient';
// import { useParams } from 'react-router-dom';

const Refrigerator = () => {
  // const { refrigeratorIdx } = useParams();
  const curRefrigerator = {
    refrigeratorIdx: 1,
    refrigeratorName: '냉장고 1',
    isCurrent: 0,
    ingredients: [
      {
        ingredientIdx: 1,
        ingredientName: 'Gin',
        ingredientImg: gin,
      },
      {
        ingredientIdx: 2,
        ingredientName: 'Strawberry',
        ingredientImg: strawberry,
      },
      {
        ingredientIdx: 3,
        ingredientName: 'Vodka',
        ingredientImg: vodka,
      },
      {
        ingredientIdx: 4,
        ingredientName: 'Milk',
        ingredientImg: milk,
      },
      {
        ingredientIdx: 5,
        ingredientName: 'Tomato Juice',
        ingredientImg: tomatoJuice,
      },
      {
        ingredientIdx: 6,
        ingredientName: 'sugar',
        ingredientImg: sugar,
      },
    ],
  };

  const [editState, setEditState] = useState(false);
  const [name, setName] = useState('');
  const refrigerators = useRecoilValue(refrigeratorsAtom);
  const navigate = useNavigate();

  const changeCurrentRefrigerator = (refrigeratorIdx) => {
    console.log(refrigeratorIdx);
  };

  const startEditing = () => {
    setEditState(true);
    setName(curRefrigerator.refrigeratorName);
  };

  const stopEditing = () => {
    setEditState(false);
    //TODO: 냉장고 이름 변경 기능 구현
    console.log(name);
  };

  const onRemove = () => {
    if (window.confirm('정말 삭제합니까?')) {
      alert('삭제되었습니다.');
      navigate('/refrigerator/list');
    } else {
      return;
    }
  };

  //TODO: 냉장고에 재료 추가, 삭제 기능 구현
  const addIngredient = (item) => {
    console.log(item);
  };

  const deleteIngredient = (item) => {
    console.log(item);
  };

  const RefrigeratorList = () => {
    return (
      <ul className='refrigeratorLinkList'>
        {refrigerators.map((refrigerator) => (
          <Link key={refrigerator.refrigeratorIdx} to={`/refrigerator/${refrigerator.refrigeratorIdx}`}>
            <li className={refrigerator.refrigeratorIdx === curRefrigerator.refrigeratorIdx ? 'currentList' : ''}>
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
          <h1>{curRefrigerator.refrigeratorName}</h1>
        )}
        {curRefrigerator.isCurrent === 1 ? (
          <AiFillStar className='refrigeratorStar' onClick={(e) => e.preventDefault()} />
        ) : (
          <AiOutlineStar
            className='refrigeratorStar'
            onClick={() => changeCurrentRefrigerator(curRefrigerator.refrigeratorIdx)}
          />
        )}
      </div>
      <div className='refrigerator'>
        <div className='ingredientList'>
          <RefrigeratorIngredient
            ingredients={curRefrigerator.ingredients}
            editState={editState}
            deleteIngredient={deleteIngredient}
          />
        </div>
        <div className='searchForRefrigerator'>
          {editState && <Search placeholder='재료를 검색해주세요.' setText={addIngredient} list={ingredientList} />}
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
