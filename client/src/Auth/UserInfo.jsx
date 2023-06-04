import React, { useEffect, useRef, useState } from 'react';
import './UserInfo.scss';
import defaultProfile from '../assets/images/defaultProfile.png';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { ModifyUserInfo, NicknameValid } from '../api/authService';
import { signUp } from '../api/authService';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isSignedInAtom, userInfoAtom } from '../recoil/atom';
import { useCookies } from 'react-cookie';
import { TiDelete } from 'react-icons/ti';
import { UploadImg } from '../api/recipeService';
import logo from '../assets/images/logo/logo_black.png';
import { AiOutlineCheck } from 'react-icons/ai';

const UserInfo = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const { email } = useParams();
  const nicknameRef = useRef();
  const [validation, setValidation] = useState(false);
  const [inputState, setInputState] = useState(false);
  const navigate = useNavigate();

  const [, setCookie, removeCookie] = useCookies(['refresh-token']);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const profileImgRef = useRef();
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState(null);
  const isSignedIn = useRecoilValue(isSignedInAtom);

  useEffect(() => {
    if (email) setInputState(true);
    else {
      setInputState(false);
      nicknameRef.current.value = userInfo.nickname;
      setProfileImgPreview(userInfo.profileImage);
    }
  }, [email, userInfo]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.includes('image')) return alert('이미지 파일만 업로드 가능합니다.');
    setProfileImg(file);
    setProfileImgPreview(URL.createObjectURL(file));
    console.log(profileImg);
  };

  const deleteImage = (e) => {
    e.preventDefault();
    setProfileImg(null);
    setProfileImgPreview(null);
    profileImgRef.current.value = '';
  };

  const nicknameValid = async () => {
    setValidation(true);
    const nickname = nicknameRef.current.value;
    const res = await NicknameValid(nickname);
    if (!res) {
      nicknameRef.current.value = '';
      setValidation(false);
    }
  };

  const userInfoSubmit = async () => {
    if (nicknameRef.current.value === '') return alert('닉네임을 입력해주세요.');
    if (!validation) {
      if (email) return alert('닉네임 중복확인을 해주세요.');
      else {
        if (nicknameRef.current.value !== userInfo.nickname) return alert('닉네임 중복확인을 해주세요.');
      }
    }

    let imgUrl = '';
    if (!email) imgUrl = userInfo.profileImage;
    if (profileImg) {
      const formData = new FormData();
      formData.append('image', profileImg);
      imgUrl = await UploadImg('User', formData);
      if (!imgUrl) return alert('이미지 업로드에 실패했습니다.');
    }

    const nickname = nicknameRef.current.value;

    if (email) {
      const res = await signUp(email, nickname, imgUrl === '' ? null : imgUrl, setUserInfo, setCookie, removeCookie);
      if (res) {
        alert('회원가입이 완료되었습니다.');
        navigate('/survey');
      }
    } else {
      const res = await ModifyUserInfo(nickname, imgUrl, setUserInfo);
      if (res) {
        setInputState(false);
        navigate('/');
      }
    }
  };

  const cancel = () => {
    setInputState(false);
    nicknameRef.current.value = userInfo.nickname;
    setProfileImg(null);
    setProfileImgPreview(userInfo.profileImage);
    profileImgRef.current.value = '';
  };

  return (
    <form className='signupContainer' onSubmit={(e) => e.preventDefault()}>
      <img className='userInfoLogo' src={logo} />
      <label
        htmlFor='cocktailFormImage'
        onClick={(e) => {
          if (!inputState) e.preventDefault();
        }}
      >
        <div className='profileImgEnroll'>
          <img
            src={
              userInfo.profileImage
                ? process.env.REACT_APP_IMG_BASE_URL + profileImgPreview
                : profileImgPreview ?? defaultProfile
            }
            alt='profile'
          />
          {profileImgPreview && inputState && <TiDelete className='deleteBtn' onClick={deleteImage} />}
        </div>
      </label>
      <input
        className='fileInput'
        type='file'
        id='cocktailFormImage'
        accept='.jpg, .jpeg, .png, .img'
        ref={profileImgRef}
        onChange={handleFile}
      />
      <div>
        <label htmlFor='email'>이메일</label>
        <br />
        <input type='text' id='email' value={email ?? userInfo.email} disabled />
      </div>
      <div>
        <label htmlFor='nickname'>닉네임</label>
        <br />
        <div className='nicknameInput'>
          <input type='text' id='nickname' ref={nicknameRef} disabled={!inputState} />
          {inputState && (
            <button className='nicknameValid' onClick={nicknameValid}>
              {isMobile ? <AiOutlineCheck /> : '중복확인'}
            </button>
          )}
        </div>
      </div>
      {email && inputState && (
        <button type='submit' onClick={userInfoSubmit}>
          회원가입
        </button>
      )}
      {!email && (
        <div className='editBtnContainer'>
          {inputState ? (
            <>
              <button className='editBtn' onClick={cancel}>
                취소
              </button>
              <button className='editBtnComplete' onClick={userInfoSubmit}>
                완료
              </button>
            </>
          ) : (
            <button
              className='editBtn'
              onClick={() => {
                if (isSignedIn) setInputState(!inputState);
              }}
            >
              수정하기
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default UserInfo;
