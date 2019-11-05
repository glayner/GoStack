import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalSyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <GlobalSyle />
    </BrowserRouter>
  );
}

export default App;
