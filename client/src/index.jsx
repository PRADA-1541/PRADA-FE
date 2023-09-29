import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CookiesProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
