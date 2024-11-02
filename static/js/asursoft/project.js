import '../../sass/asursoft/project.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Получаем элемент с id "root" и создаем root для рендеринга
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Рендерим компонент App
root.render(<App />);
