import { useRef } from 'react';

const useClickState = (setModal) => {
  const ref = useRef(null);
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (setModal) setModal(false);
    }
  };

  return [ref, handleClickOutside];
};

export default useClickState;
