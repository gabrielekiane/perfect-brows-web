/* eslint-disable react/jsx-indent */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import GlobalStyle from './styles/global';
import AppProvider from './hooks/index';

const App: React.FC = () => (
    <BrowserRouter>
        <AppProvider>
            <Routes />
        </AppProvider>

        <GlobalStyle />
    </BrowserRouter>
);

export default App;
