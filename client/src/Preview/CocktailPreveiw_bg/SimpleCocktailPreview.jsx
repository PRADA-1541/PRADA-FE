import React from 'react';
import './SimpleCocktailPreview.scss';
import { AiFillStar } from 'react-icons/ai';
import KeyWord from '../../Material/Keyword/KeyWord';

const SimpleCocktailPreview = () => {
  return (
    <div className='simplePreviewContainer'>
      <h1>오늘의 추천 칵테일</h1>
      <div className='recipePreviewContainer'>
        <img
          width='400px'
          src='data:image/jpeg;base64,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'
          alt='cocktail image'
        />
        <div className='cocktailInfo'>
          <h2>칵테일 이름</h2>
          <p className='cocktailContent'>
            칵테일 설명, 시기다른 래퍼들의 반대편을 바라보는 래퍼들의 배포 그건 백프로 개뻥 뭐든 개빨어 마치 텐프로 됐어
            보인 각본짜인 대본 텐션을 업을 해 해야지 제대로 난 이 게임에서 아크로뱃 내 랩들은 전부 다 감으로 해 돈
            벌어먹지 못해 나를 바라보는 래퍼들은 말하더군 진짜 개빨라 뭐든 개빨어 마치 텐프로 됐어 보인 각본짜인 대본
            텐션을 업을 해 해야지 제대로 난 이 게임에서 아크로뱃 내 랩들은 전부 다 감으로 해 돈 벌어먹지 못해 나를
            바라보는 래퍼들은 말하더군 진짜 개빨라 뭐든 개빨어 마치 텐프로 됐어 보인 각본짜인 대본 텐션을 업을 해 해야지
            제대로 난 이 게임에서 아크로뱃 내 랩들은 전부 다 감으로 해 돈 벌어먹지 못해 나를 바라보는 래퍼들은 말하더군
          </p>
          <div className='keywords'>
            <KeyWord keyword='조광일' />
            <KeyWord keyword='곡예사' />
            <KeyWord keyword='개빨라' />
            <KeyWord keyword='랩' />
            <KeyWord keyword='가사가' />
            <KeyWord keyword='다들림' />
            <KeyWord keyword='ㅋㅋ' />
            <KeyWord keyword='회상록' />
          </div>
          <div className='eval'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <p>3.8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCocktailPreview;
