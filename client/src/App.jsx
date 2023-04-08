import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './styles/globalStyle.scss';
import Home from './Main/Main';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import CocktailList from './CocktailList/CocktailList';

const App = () => {
  return (
    <div className='AppContainer'>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/cocktails/:category' element={<CocktailList />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
};

export default App;
