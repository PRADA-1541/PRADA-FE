import React, { ReactPropTypes } from 'react';
import './KeyWord.scss';

const KeyWord = ({ keyword }) => {
  return (
    <div className='keyword'>
      <p className='hashtag'>#</p>
      <p>{keyword}</p>
    </div>
  );
};

KeyWord.propTypes = {
  keyword: ReactPropTypes.string.isRequired,
};

export default KeyWord;
