import React from 'react';
import './Comment.scss';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

const Comment = ({ comment }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  const CommentPc = () => {
    return (
      <div className='commentContainer'>
        <div className='commentHeader'>
          <img className='commentProfileImg' src={comment.profile} alt='프로필 이미지' />
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

  const CommentMobile = () => {
    return (
      <div className='commentContainer'>
        <div>
          <div className='commentProfile'>
            <img className='commentProfileImg' src={comment.profile} alt='프로필 이미지' />
            <span>{comment.name}</span>
          </div>
          <p className='commentContent'>{comment.content}</p>
          <p className='commentDate'>{comment.date}</p>
        </div>
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

  return isMobile ? <CommentMobile /> : <CommentPc />;
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
