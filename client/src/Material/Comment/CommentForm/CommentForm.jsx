import React, { useEffect, useRef } from 'react';
import './CommentForm.scss';
import PropTypes from 'prop-types';

const CommentForm = ({ submitComment, prevValue }) => {
  const commentRef = useRef();

  useEffect(() => {
    commentRef.current.value = prevValue ?? '';
  }, [prevValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment(commentRef.current.value);
    commentRef.current.value = '';
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
  prevValue: PropTypes.string,
};

export default CommentForm;
