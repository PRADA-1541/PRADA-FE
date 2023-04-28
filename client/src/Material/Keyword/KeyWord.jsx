import React from 'react';
import PropTypes from 'prop-types';
import './KeyWord.scss';

const KeyWord = ({ keyword, onClick }) => {
  return (
    <span className='keywordContainer' onClick={onClick}>
      <p className='hashtag'>#</p>
      <p className='keyword'>{keyword}</p>
    </span>
  );
};

KeyWord.propTypes = {
  keyword: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default KeyWord;
