import React from 'react';
import './Auth.scss';

const SignIn = () => {
  return (
    <div className='bg'>
      <div>
        <h1>PRADA</h1>
        <form>
          <input type='text' />
          <input type='password' />
          <button>로그인</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
