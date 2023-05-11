import React from 'react';
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
import { RecoilRoot } from 'recoil';
import './styles/globalStyle.scss';
import Main from './Main/Main';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import CocktailList from './CocktailList/CocktailList';
import CocktailRecpie from './Recipe/CocktailRecipe/CocktailRecipe';
import RecipeForm from './Recipe/RecipeForm/RecipeForm';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Refrigerators from './Refrigerator/Refrigerators/Refrigerators';
import Refrigerator from './Refrigerator/Refrigerator/Refrigerator';
import SearchList from './SearchList/SearchList';
import MyPosting from './MyPosting/MyPosting';

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
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <main className='AppContainer'>
            <SentryRoutes>
              <Route path='/' element={<Main />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/cocktails/:category' element={<CocktailList />} />
              <Route path='/cocktail'>
                <Route path=':cocktailIdx' element={<CocktailRecpie />} />
                <Route path='new' element={<RecipeForm />} />
              </Route>
              <Route path='/refrigerator'>
                <Route path='list' element={<Refrigerators />} />
                <Route path=':refrigeratorIdx' element={<Refrigerator />} />
              </Route>
              <Route path='/search/:searchWord' element={<SearchList />} />
              <Route path='/myPosting' element={<MyPosting />} />
            </SentryRoutes>
          </main>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

export default App;
