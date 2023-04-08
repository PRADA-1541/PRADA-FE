import React from 'react';
import './MaterialBox.scss';
import PropTypes from 'prop-types';
import KeyWord from '../Keyword/KeyWord';

const MaterialBox = ({ type, keywords }) => {
  const Keywords = () => {
    return keywords.map((keyword) => <KeyWord key={keyword} keyword={keyword} />);
  };

  return (
    <div className='keywordBox'>
      <h1>{type}</h1>
      <div className='keywords'>
        <Keywords />
      </div>
    </div>
  );
};

MaterialBox.propTypes = {
  type: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MaterialBox;
