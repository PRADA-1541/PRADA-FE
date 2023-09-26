import React, { useEffect, useState } from 'react';
import './Loading.scss';
import CircularProgress from '@mui/material/CircularProgress';
import ailogo from '../../assets/images/logo/chat_black.png';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const [timeOutId, setTimeOutId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate('/');
    }, 2850);
    setTimeOutId(timeOut);
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <div className='loadingContainer'>
      <h1>
        <img src={ailogo} style={{ width: '3.5rem', paddingBottom: '0.2rem' }} />
        AI가 당신에게 추천해 줄 만한 칵테일을 찾고 있어요!
      </h1>
      <CircularProgress color='secondary' />
    </div>
  );
};

export default Loading;
