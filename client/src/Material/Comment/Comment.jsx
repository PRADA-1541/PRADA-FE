import React from 'react';
import './Comment.scss';
import PropTypes from 'prop-types';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

const Comment = ({ comment }) => {
  return (
    <div className='commentContainer'>
      <div className='commentHeader'>
        <img className='commentProfile' src={comment.profile} alt='프로필 이미지' />
        <div className='nameAndDate'>
          <p className='commentName'>{comment.name}</p>
          <p className='commentDate'>{comment.date}</p>
        </div>
      </div>
      <p className='commentContent'>{comment.content}</p>
      <div className='commentEval'>
        <p className='commentLike'>
          {comment.like}
          <AiOutlineLike />
        </p>
        <p className='commentDislike'>
          {comment.dislike}
          <AiOutlineDislike />
        </p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
