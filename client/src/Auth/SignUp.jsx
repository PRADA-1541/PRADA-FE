import React, { useRef, useState } from 'react';
import './SignUp.scss';
import defaultProfile from '../assets/images/defaultProfile.png';
import { useNavigate, useParams } from 'react-router-dom';
import { NicknameValid } from '../api/authService';
import { signUp } from '../api/authService';
import { useSetRecoilState } from 'recoil';
import { userInfoAtom, isSignedInAtom } from '../recoil/atom';
import { useCookies } from 'react-cookie';
import { TiDelete } from 'react-icons/ti';
import { UploadImg } from '../api/recipeService';

const SignUp = () => {
  const { email } = useParams();
  const nicknameRef = useRef();
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['refresh-token']);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setIsSignedIn = useSetRecoilState(isSignedInAtom);
  const profileImgRef = useRef();
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgPreview, setProfileImgPreview] = useState(null);

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

  const signUpSubmit = async () => {
    if (nicknameRef.current.value === '') return alert('닉네임을 입력해주세요.');
    if (!validation) return alert('닉네임 중복확인을 해주세요.');

    let imgUrl = '';
    if (profileImg) {
      const formData = new FormData();
      formData.append('image', profileImg);
      imgUrl = await UploadImg('User', formData);
      if (!imgUrl) return alert('이미지 업로드에 실패했습니다.');
    }

    const nickname = nicknameRef.current.value;
    const res = await signUp(
      email,
      nickname,
      imgUrl === '' ? null : imgUrl,
      setUserInfo,
      cookies,
      setCookie,
      setIsSignedIn
    );
    if (res) navigate('/');
  };

  return (
    <form className='signupContainer' onSubmit={(e) => e.preventDefault()}>
      <h1>BOTTENDER</h1>
      <label htmlFor='cocktailFormImage'>
        <div className='profileImgEnroll'>
          <img src={profileImgPreview ?? defaultProfile} alt='profile' />
          {profileImgPreview && <TiDelete className='deleteBtn' onClick={deleteImage} />}
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
        <input type='text' id='email' value={email} disabled />
      </div>
      <div>
        <label htmlFor='nickname'>닉네임</label>
        <br />
        <div className='nicknameInput'>
          <input type='text' id='nickname' ref={nicknameRef} />
          <button className='nicknameValid' onClick={nicknameValid}>
            중복확인
          </button>
        </div>
      </div>
      <button type='submit' onClick={signUpSubmit}>
        회원가입
      </button>
    </form>
  );
};

export default SignUp;
