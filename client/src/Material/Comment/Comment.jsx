import React, { useState } from 'react';
import './Comment.scss';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import defaultProfile from '../../assets/images/defaultProfile.png';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../recoil/atom';
import CommentForm from './CommentForm/CommentForm';
import { SetCommentLikeState, UpdateComment } from '../../api/recipeService';
import { useNavigate, useLocation } from 'react-router-dom';

const Comment = ({ comment, deleteComment }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const { userIdx, nickname, profileImage } = useRecoilValue(userInfoAtom);
  const [isEditting, setIsEditting] = useState(false);
  const [hasLike, setHasLike] = useState(comment.hasLike);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [dislikeCount, setDislikeCount] = useState(comment.dislikeCount);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const date = new Date(comment.createdAt);
  const createdAt = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  const moveToRecipe = () => {
    navigate(`/cocktail/${comment.cocktailIdx}`);
  };

  const likeComment = async () => {
    if (hasLike === 1) {
      const res = await SetCommentLikeState(comment.id, null);
      if (res) {
        setHasLike(null);
        setLikeCount(likeCount - 1);
      }
    } else {
      const res = await SetCommentLikeState(comment.id, 1);
      if (res) {
        setLikeCount(likeCount + 1);
        if (hasLike === -1) {
          setDislikeCount(dislikeCount - 1);
        }
        setHasLike(1);
      }
    }
  };

  const dislikeComment = async () => {
    if (hasLike === -1) {
      const res = await SetCommentLikeState(comment.id, null);
      if (res) {
        setHasLike(null);
        setDislikeCount(dislikeCount - 1);
      }
    } else {
      const res = await SetCommentLikeState(comment.id, -1);
      if (res) {
        setDislikeCount(dislikeCount + 1);
        if (hasLike === 1) {
          setLikeCount(likeCount - 1);
        }
        setHasLike(-1);
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
        <div
          className={pathname === '/myPosting' ? 'myCommentLink' : 'commentContainer'}
          onClick={pathname === '/myPosting' ? moveToRecipe : null}
        >
          <div className='commentHeader'>
            {pathname === '/myPosting' ? (
              <img
                className='commentProfileImg'
                src={profileImage ? process.env.REACT_APP_IMG_BASE_URL + profileImage : defaultProfile}
                alt='프로필 이미지'
              />
            ) : (
              <img
                className='commentProfileImg'
                src={
                  comment.authorProfile ? process.env.REACT_APP_IMG_BASE_URL + comment.authorProfile : defaultProfile
                }
                alt='프로필 이미지'
              />
            )}
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
              {likeCount}
              {hasLike === 1 ? <AiFillLike /> : <AiOutlineLike />}
            </p>
            <p className='commentDislike' onClick={dislikeComment}>
              {dislikeCount}
              {hasLike === -1 ? <AiFillDislike /> : <AiOutlineDislike />}
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
      <>
        <div className='commentContainer'>
          <div>
            <div className='commentProfile'>
              <img
                className='commentProfileImg'
                src={
                  comment.authorProfile ? process.env.REACT_APP_IMG_BASE_URL + comment.authorProfile : defaultProfile
                }
                alt='프로필 이미지'
              />
              <span>{comment.nickname ?? nickname}</span>
            </div>
            <p className='commentContent'>{comment.content}</p>
            <p className='commentDate'>{createdAt.toString()}</p>
          </div>
          <div className='commentEval'>
            <p className='commentLike'>
              {likeCount}
              {hasLike === 1 ? <AiFillLike /> : <AiOutlineLike />}
            </p>
            <p className='commentDislike'>
              {dislikeCount}
              {hasLike === -1 ? <AiFillDislike /> : <AiOutlineDislike />}
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

  return isMobile ? <CommentMobile /> : <CommentPc />;
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func,
};

export default Comment;
