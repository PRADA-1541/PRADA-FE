import React, { useEffect, useRef, useState } from 'react';
import './SignUp.scss';
import defaultProfile from '../assets/images/defaultProfile.png';
import { useNavigate, useParams } from 'react-router-dom';
import { ModifyUserInfo, NicknameValid } from '../api/authService';
import { signUp } from '../api/authService';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../recoil/atom';
import { useCookies } from 'react-cookie';
import { TiDelete } from 'react-icons/ti';
import { UploadImg } from '../api/recipeService';

const UserInfo = () => {
  const { email } = useParams();
  const nicknameRef = useRef();
  const [validation, setValidation] = useState(false);
  const [inputState, setInputState] = useState(false);
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['refresh-token']);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const profileImgRef = useRef();
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState(null);

  useEffect(() => {
    if (email) setInputState(true);
    else {
      setInputState(false);
      nicknameRef.current.value = userInfo.nickname;
      setProfileImgPreview(userInfo.profileImage);
    }
  }, [email]);

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
    if (!validation) return alert('닉네임 중복확인을 해주세요.');

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
      const res = await signUp(email, nickname, imgUrl === '' ? null : imgUrl, setUserInfo, setCookie);
      if (res) navigate('/');
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
      <h1>BOTTENDER</h1>
      <label
        htmlFor='cocktailFormImage'
        onClick={(e) => {
          if (!inputState) e.preventDefault();
        }}
      >
        <div className='profileImgEnroll'>
          <img
            src={
              profileImgPreview
                ? email
                  ? profileImgPreview
                  : process.env.REACT_APP_IMG_BASE_URL + profileImgPreview
                : defaultProfile
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
              중복확인
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
                setInputState(!inputState);
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
