import React from 'react';
import './KeywordBox.scss';
import PropTypes from 'prop-types';
import KeyWord from './Keyword/KeyWord';

const KeywordBox = ({ keywords }) => {
  const Keywords = () => {
    return keywords.map((keyword) => <KeyWord key={keyword} keyword={keyword} />);
  };

  return (
    <div className='keywordBox'>
      <h1>키워드</h1>
      <div className='keywords'>
        <Keywords />
      </div>
    </div>
  );
};

KeywordBox.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default KeywordBox;
