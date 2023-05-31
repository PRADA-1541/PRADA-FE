import React from 'react';
import PropTypes from 'prop-types';
import './KeyWord.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const KeyWord = ({ keyword, onClick, isChecked }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isInForm = (location.pathname === '/cocktail/new') | location.pathname.startsWith('/cocktail/edit');

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  return (
    <div
      className={isChecked ? 'keywordContainer-checked' : isInForm ? 'keywordContainer' : 'keywordContainer-italic'}
      onClick={onClick}
    >
      <span className={isInForm ? 'hashtag' : 'hashtag-italic'}>#</span>
      <span
        className={isInForm ? 'keyword' : 'keyword-italic'}
        onClick={
          (location.pathname === '/cocktail/new') | location.pathname.startsWith('/cocktail/edit') ? null : search
        }
      >
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
