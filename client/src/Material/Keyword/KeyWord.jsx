import React from 'react';
import PropTypes from 'prop-types';
import './KeyWord.scss';

const KeyWord = ({ keyword }) => {
  return (
    <span className='keywordContainer'>
      <p className='hashtag'>#</p>
      <p className='keyword'>{keyword}</p>
    </span>
  );
};

KeyWord.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default KeyWord;
