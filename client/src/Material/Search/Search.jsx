import React, { useState, useEffect } from 'react';
import './Search.scss';
import PropTypes from 'prop-types';
import useClickState from '../../hooks/useClickState';

const Search = ({ setSearch, placeholder, setText, setNewIngredientInfo, list }) => {
  const [searchWord, setSearchWord] = useState('');
  const [ref, handleClickOutside] = useClickState(setSearch);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleClick = (item) => {
    setText(item);
    setSearch(false);
    if (setNewIngredientInfo) {
      setNewIngredientInfo({});
    }
  };

  return (
    <div className='searchContainer' ref={ref}>
      <input
        className='searchInput'
        type='text'
        placeholder={placeholder}
        onChange={(e) => setSearchWord(e.target.value)}
        value={searchWord}
      />
      <ul className='searchList'>
        {list.map((item) => {
          if (item.includes(searchWord)) {
            return (
              <li className='searchedItem' key={item} onClick={() => handleClick(item)}>
                {item}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

Search.propTypes = {
  setSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  setNewIngredientInfo: PropTypes.func,
  list: PropTypes.array.isRequired,
};

export default Search;
