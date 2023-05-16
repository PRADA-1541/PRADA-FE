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
          <img className='commentProfileImg' src={comment.profileImg} alt='프로필 이미지' />
          <div className='nameAndDate'>
            <p className='commentName'>{comment.nickname}</p>
            <p className='commentDate'>{comment.cocktailCommentCreatedAt}</p>
          </div>
        </div>
        <p className='commentContent'>{comment.cocktailComment}</p>
        <div className='commentEval'>
          <p className='commentLike'>
            {comment.cocktailCommentLikes}
            <AiOutlineLike />
          </p>
          <p className='commentDislike'>
            {comment.cocktailCommentDisLikes}
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
            <img className='commentProfileImg' src={comment.profileImg} alt='프로필 이미지' />
            <span>{comment.nickname}</span>
          </div>
          <p className='commentContent'>{comment.cocktailComment}</p>
          <p className='commentDate'>{comment.cocktailCommentCreatedAt}</p>
        </div>
        <div className='commentEval'>
          <p className='commentLike'>
            {comment.cocktailCommentLikes}
            <AiOutlineLike />
          </p>
          <p className='commentDislike'>
            {comment.cocktailCommentDisLikes}
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
