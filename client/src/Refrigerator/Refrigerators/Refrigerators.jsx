import React, { useEffect } from 'react';
import './Refrigerators.scss';
import refrigerator1 from '../../assets/images/refrigerator/refrigerator1.png';
import refrigerator2 from '../../assets/images/refrigerator/refrigerator2.png';
import refrigerator3 from '../../assets/images/refrigerator/refrigerator3.png';
import refrigerator4 from '../../assets/images/refrigerator/refrigerator4.png';
import refrigerator5 from '../../assets/images/refrigerator/refrigerator5.png';
import refrigerator6 from '../../assets/images/refrigerator/refrigerator6.png';
import refrigerator7 from '../../assets/images/refrigerator/refrigerator7.png';
import refrigerator8 from '../../assets/images/refrigerator/refrigerator8.png';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { refrigeratorsAtom } from '../../recoil/refrigeratorAtom';
import { CreateRefrigerator, GetRefrigeratorList } from '../../api/refrigeratorService';

const Refrigerators = () => {
  const [refrigerators, setRefrigerators] = useRecoilState(refrigeratorsAtom);

  useEffect(() => {
    GetRefrigeratorList(setRefrigerators);
  }, []);

  const newRefrigerator = () => {
    if (refrigerators.length >= 8) {
      alert('냉장고는 최대 8개까지 추가할 수 있습니다.');
      return;
    }
    if (refrigerators.length === 0) {
      CreateRefrigerator('냉장고 1', 1, setRefrigerators);
      return;
    } else {
      CreateRefrigerator('냉장고 ' + (refrigerators.length + 1), 0, setRefrigerators);
      console.log('냉장고 ' + (refrigerators.length + 1));
    }
  };

  const changeCurrentRefrigerator = (e, refrigeratorIdx) => {
    e.preventDefault();
    console.log(refrigeratorIdx);
  };

  const Info = () => {
    return (
      <Link className='refrigeratorContainer'>
        <img src={refrigerator8} alt='냉장고 이미지' />
        <span>새로운 냉장고를 추가해주세요!</span>
      </Link>
    );
  };

  const RefrigeratorList = () => {
    return refrigerators.map((refrigerator, idx) => {
      let refrigeratorImg = '';
      switch (idx) {
        case 0:
          refrigeratorImg = refrigerator1;
          break;
        case 1:
          refrigeratorImg = refrigerator2;
          break;
        case 2:
          refrigeratorImg = refrigerator3;
          break;
        case 3:
          refrigeratorImg = refrigerator4;
          break;
        case 4:
          refrigeratorImg = refrigerator5;
          break;
        case 5:
          refrigeratorImg = refrigerator6;
          break;
        case 6:
          refrigeratorImg = refrigerator7;
          break;
        case 7:
          refrigeratorImg = refrigerator8;
          break;
        default:
          break;
      }

      return (
        <Link
          className='refrigeratorContainer'
          key={refrigerator.refrigeratorIdx}
          to={`/refrigerator/${refrigerator.refrigeratorIdx}`}
        >
          <img src={refrigeratorImg} alt='냉장고 이미지' />
          <>
            <span>{refrigerator.refrigeratorName}</span>
            {refrigerator.isMain === 1 ? (
              <AiFillStar className='refrigeratorStar' onClick={(e) => e.preventDefault()} />
            ) : (
              <AiOutlineStar
                className='refrigeratorStar'
                onClick={(e) => changeCurrentRefrigerator(e, refrigerator.refrigeratorIdx)}
              />
            )}
          </>
        </Link>
      );
    });
  };

  return (
    <div>
      <div className='refrigeratorHeader'>
        <h1>내 냉장고</h1>
        <button className='addRefrigerator' onClick={newRefrigerator}>
          냉장고 추가
        </button>
      </div>
      <div className='refrigeratorGrid'>{refrigerators.length === 0 ? <Info /> : <RefrigeratorList />}</div>
    </div>
  );
};

export default Refrigerators;
