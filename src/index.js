import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ScoresContextProvider } from './context/ScoresContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
     <ScoresContextProvider>
        <App />
      </ScoresContextProvider>
    </AuthContextProvider>
  </BrowserRouter> 
);


