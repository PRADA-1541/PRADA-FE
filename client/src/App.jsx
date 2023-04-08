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
import Home from './Main/Main';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import CocktailList from './CocktailList/CocktailList';

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
  replaysOnErrorSampleRate: 1.0,
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const App = () => {
  return (
    <div className='AppContainer'>
      <RecoilRoot>
        <BrowserRouter>
          <SentryRoutes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/cocktails/:category' element={<CocktailList />} />
          </SentryRoutes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
};

export default App;
