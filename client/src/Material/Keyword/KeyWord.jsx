import React from 'react';
import PropTypes from 'prop-types';
import './KeyWord.scss';

const KeyWord = ({ keyword, onClick, isChecked }) => {
  return (
    <span className={isChecked ? 'keywordContainer-checked' : 'keywordContainer'} onClick={onClick}>
      <p className='hashtag'>#</p>
      <p className='keyword'>{keyword}</p>
    </span>
  );
};

KeyWord.propTypes = {
  keyword: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default KeyWord;
