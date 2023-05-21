import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ScrollToTop />
    <App />
  </React.StrictMode>,
);
