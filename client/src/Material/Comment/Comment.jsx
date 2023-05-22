import React, { useState } from 'react';
import './Comment.scss';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import defaultImage from '../../assets/images/defaultImage.png';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../recoil/atom';
import CommentForm from './CommentForm/CommentForm';
import { SetCommentLikeState, UpdateComment } from '../../api/recipeService';
import { useNavigate, useLocation } from 'react-router-dom';

const Comment = ({ comment, deleteComment }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const { userIdx, nickname } = useRecoilValue(userInfoAtom);
  const [isEditting, setIsEditting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const date = new Date(comment.createdAt);
  const createdAt = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  const moveToRecipe = () => {
    navigate(`/cocktail/${comment.cocktailIdx}`);
  };

  const likeComment = async () => {
    if (comment.hasLike === 1) {
      const res = await SetCommentLikeState(comment.id, null);
      if (res) {
        comment.likeCount -= 1;
        comment.hasLike = null;
      }
    } else {
      const res = await SetCommentLikeState(comment.id, 1);
      if (res) {
        comment.likeCount += 1;
        if (comment.hasLike === -1) comment.dislikeCount -= 1;
        comment.hasLike = 1;
      }
    }
  };

  const dislikeComment = async () => {
    if (comment.hasLike === -1) {
      const res = await SetCommentLikeState(comment.id, null);
      if (res) {
        comment.dislikeCount -= 1;
        comment.hasLike = null;
      }
    } else {
      const res = await SetCommentLikeState(comment.id, -1);
      if (res) {
        comment.dislikeCount += 1;
        if (comment.hasLike === 1) comment.likeCount -= 1;
        comment.hasLike = -1;
      }
    }
  };

  const updateComment = async (content) => {
    const res = await UpdateComment(comment.id, content);
    if (res) {
      alert('댓글이 수정되었습니다.');
      setIsEditting(false);
      comment.content = content;
    }
  };

  const CommentPc = () => {
    return isEditting ? (
      <CommentForm submitComment={updateComment} prevValue={comment.content} />
    ) : (
      <>
        <div className={pathname === '/myPosting' ? 'myCommentLink' : 'commentContainer'} onClick={moveToRecipe}>
          <div className='commentHeader'>
            <img className='commentProfileImg' src={comment.profileImg ?? defaultImage} alt='프로필 이미지' />
            <div className='nameAndDate'>
              <p className='commentName'>{comment.nickname ?? nickname}</p>
              <p className='commentDate'>{createdAt.toString()}</p>
            </div>
          </div>
          <>
            <p className='commentContent'>{comment.content}</p>
          </>
          <div className='commentEval'>
            <p className='commentLike' onClick={likeComment}>
              {comment.likeCount}
              {comment.hasLike === 1 ? <AiFillLike /> : <AiOutlineLike />}
            </p>
            <p className='commentDislike' onClick={dislikeComment}>
              {comment.dislikeCount}
              {comment.hasLike === -1 ? <AiFillDislike /> : <AiOutlineDislike />}
            </p>
          </div>
        </div>
        {userIdx === comment.authorId && (
          <>
            <div className='updateCommentBox'>
              <span className='updateComment' onClick={() => setIsEditting(true)}>
                수정
              </span>
              <span className='updateComment' onClick={() => deleteComment(comment.id)}>
                삭제
              </span>
            </div>
          </>
        )}
      </>
    );
  };

  const CommentMobile = () => {
    return (
      <div className='commentContainer'>
        <div>
          <div className='commentProfile'>
            <img className='commentProfileImg' src={comment.profileImg ?? defaultImage} alt='프로필 이미지' />
            <span>{comment.nickname}</span>
          </div>
          <p className='commentContent'>{comment.content}</p>
          <p className='commentDate'>{comment.createdAt}</p>
        </div>
        <div className='commentEval'>
          <p className='commentLike'>
            {comment.likeCount}
            <AiOutlineLike />
          </p>
          <p className='commentDislike'>
            {comment.dislikeCount}
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
  deleteComment: PropTypes.func,
};

export default Comment;
