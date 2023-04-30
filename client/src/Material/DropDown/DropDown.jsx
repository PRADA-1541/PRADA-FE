import React, { useEffect } from 'react';
import './DropDown.scss';
import PropTypes from 'prop-types';
import useClickState from '../../hooks/useClickState';

const DropDown = ({ setDropDown, list, onClick }) => {
  const [ref, unitHandleClickOutside] = useClickState(setDropDown);

  useEffect(() => {
    document.addEventListener('mousedown', unitHandleClickOutside);
    return () => {
      document.removeEventListener('mousedown', unitHandleClickOutside);
    };
  }, [ref]);

  const handleClick = (item) => {
    onClick(item);
    setDropDown(false);
  };

  return (
    <ul className='dropDown' ref={ref}>
      {list.map((item, index) => {
        return (
          <li key={index} onClick={() => handleClick(item)}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

DropDown.propTypes = {
  setDropDown: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DropDown;
