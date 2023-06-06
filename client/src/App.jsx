import React, { useEffect } from 'react';
import './styles/globalStyle.scss';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { useSetRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { refresh } from './api/authService';
import Main from './Main/Main';
import CocktailList from './CocktailList/CocktailList';
import CocktailRecpie from './Recipe/CocktailRecipe/CocktailRecipe';
import RecipeForm from './Recipe/RecipeForm/RecipeForm';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { didSurveyAtom, isSignedInAtom, userInfoAtom } from './recoil/atom';
import Refrigerators from './Refrigerator/Refrigerators/Refrigerators';
import Refrigerator from './Refrigerator/Refrigerator/Refrigerator';
import SearchList from './SearchList/SearchList';
import MyPosting from './MyPosting/MyPosting';
import SignIn from './Auth/SignIn';
import Survey from './Survey/Survey';
import UserInfo from './Auth/UserInfo';
import Loading from './Material/Loading/Loading';

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
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 0.1,
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const App = () => {
  const [cookies, , removeCookie] = useCookies(['refresh-token']);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setIsSignedIn = useSetRecoilState(isSignedInAtom);
  const setDidSurvey = useSetRecoilState(didSurveyAtom);
  const navigate = useNavigate();

  useEffect(() => {
    async function Refresh() {
      try {
        if (await refresh(cookies['refresh-token'], setUserInfo, navigate, setDidSurvey, removeCookie)) {
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
      <Header />
      <main className='AppContainer'>
        <SentryRoutes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup/:email' element={<UserInfo />} />
          <Route path='/survey' element={<Survey />} />
          <Route path='/cocktails/:category' element={<CocktailList />} />
          <Route path='/cocktail'>
            <Route path='new' element={<RecipeForm />} />
            <Route path='edit/:cocktailIdx' element={<RecipeForm />} />
            <Route path=':cocktailIdx' element={<CocktailRecpie />} />
          </Route>
          <Route path='/refrigerator'>
            <Route path='list' element={<Refrigerators />} />
            <Route path=':refrigeratorIdx' element={<Refrigerator />} />
          </Route>
          <Route path='/search'>
            <Route path=':searchWord/:searchIdx' element={<SearchList />} />
            <Route path=':searchWord' element={<SearchList />} />
          </Route>
          <Route path='/myPosting' element={<MyPosting />} />
          <Route path='/user-info' element={<UserInfo />} />
          <Route path='/loading' element={<Loading />} />
        </SentryRoutes>
      </main>
      <Footer />
    </>
  );
};

export default App;
