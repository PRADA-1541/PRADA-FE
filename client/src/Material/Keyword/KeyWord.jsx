import React from 'react';
import PropTypes from 'prop-types';
import './KeyWord.scss';

const KeyWord = ({ keyword, onClick, isChecked }) => {
  return (
    <div className={isChecked ? 'keywordContainer-checked' : 'keywordContainer'} onClick={onClick}>
      <span className='hashtag'>#</span>
      <span className='keyword'>{keyword}</span>
    </div>
  );
};

KeyWord.propTypes = {
  keyword: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default KeyWord;
