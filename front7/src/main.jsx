
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Header from './pages/Header.jsx';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(

    <HashRouter>
      <Header />
    <HashRouter/>

);
