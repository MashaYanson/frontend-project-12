import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import init from './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(await init());
