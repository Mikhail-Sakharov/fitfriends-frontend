import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import {Provider} from 'react-redux';
import {store} from './store';
import {refreshTokensAction} from './store/api-actons';

store.dispatch(refreshTokensAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
