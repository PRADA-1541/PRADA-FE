import React, { useRef } from 'react';
import './CommentForm.scss';
import PropTypes from 'prop-types';

const CommentForm = ({ submitComment }) => {
  const commentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment(commentRef.current.value);
  };

  return (
    <form className='commentForm' onSubmit={(e) => handleSubmit(e)}>
      <textarea className='commentTextarea' placeholder='댓글을 입력하세요' ref={commentRef} />
      <button type='submit' className='commentSubmitBtn'>
        작성
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
};

export default CommentForm;
