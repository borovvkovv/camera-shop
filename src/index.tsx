import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <ToastContainer />
        <App />
        <Link
          className='up-btn'
          to='#'
          onClick={(evt: React.MouseEvent) => {
            evt.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          <svg
            width='12'
            height='18'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-arrow2'></use>
          </svg>
        </Link>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
