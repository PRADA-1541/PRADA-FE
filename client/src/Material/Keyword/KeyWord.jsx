import React from 'react';
import PropTypes from 'prop-types';
import './KeyWord.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const KeyWord = ({ keyword, onClick, isChecked }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  return (
    <div className={isChecked ? 'keywordContainer-checked' : 'keywordContainer'} onClick={onClick}>
      <span className='hashtag'>#</span>
      <span className='keyword' onClick={location.pathname === 'cocktail/new' ? null : search}>
        {keyword}
      </span>
    </div>
  );
};

KeyWord.propTypes = {
  keyword: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default KeyWord;
