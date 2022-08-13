import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import States from './component/Context/States';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <States>

        <App />
    </States>

);

