import React, { useEffect } from 'react';
import './styles/globalStyle.scss';
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { getKaKaoToken, refresh } from './api/authService';
import Main from './Main/Main';
import CocktailList from './CocktailList/CocktailList';
import CocktailRecpie from './Recipe/CocktailRecipe/CocktailRecipe';
import RecipeForm from './Recipe/RecipeForm/RecipeForm';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { isSignedInAtom, userInfoAtom } from './recoil/atom';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0, //배포시 0.5로 변경
  replaysOnErrorSampleRate: 1.0,
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const App = () => {
  const [cookies, setCookie] = useCookies(['refresh-token']);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setIsSignedIn = useSetRecoilState(isSignedInAtom);

  useEffect(() => {
    const urlParams = new URL(location.href).searchParams;
    const kakaoToken = urlParams.get('code');
    if (kakaoToken) getKaKaoToken(kakaoToken, setUserInfo, cookies, setCookie, setIsSignedIn);

    async function Refresh() {
      try {
        if (await refresh(cookies['refresh-token'], cookies, setUserInfo, setIsSignedIn)) {
          setIsSignedIn(true);
        } else {
          sessionStorage.removeItem('token_exp');
        }
      } catch (err) {
        sessionStorage.removeItem('token_exp');
      }
    }
    if (cookies['refresh-token']) {
      Refresh();
    } else {
      sessionStorage.removeItem('token_exp');
    }
  }, []);

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <main className='AppContainer'>
            <SentryRoutes>
              <Route path='/' element={<Main />} />
              <Route path='/cocktails/:category' element={<CocktailList />} />
              <Route path='/cocktail'>
                <Route path=':cocktailIdx' element={<CocktailRecpie />} />
                <Route path='new' element={<RecipeForm />} />
              </Route>
            </SentryRoutes>
          </main>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

export default App;
