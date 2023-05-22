import React, { useState } from 'react';
import './Comment.scss';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import defaultImage from '../../assets/images/defaultImage.png';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../recoil/atom';
import CommentForm from './CommentForm/CommentForm';
import { UpdateComment } from '../../api/recipeService';

const Comment = ({ comment, deleteComment }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const { userIdx, nickname } = useRecoilValue(userInfoAtom);
  const [isEditting, setIsEditting] = useState(false);

  const date = new Date(comment.createdAt);
  const createdAt = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

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
        <div className='commentContainer'>
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
