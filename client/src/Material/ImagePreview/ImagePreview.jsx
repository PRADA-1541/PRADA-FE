import React from 'react';
import './ImagePreview.scss';
import { TiDelete } from 'react-icons/ti';
import PropTypes from 'prop-types';

const ImagePreview = ({ imagePreview, deleteImage }) => {
  return (
    <div className='imagePreview'>
      <img className='cocktailPreview' src={imagePreview} alt='cocktail image' />
      <TiDelete className='deleteBtn' onClick={deleteImage} />
    </div>
  );
};

ImagePreview.propTypes = {
  imagePreview: PropTypes.string.isRequired,
  deleteImage: PropTypes.func.isRequired,
};

export default ImagePreview;
