import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import {Provider} from 'react-redux';
import {store} from './store';
import {refreshTokensAction} from './store/api-actons';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setDataLoadedStatus} from './store/app-data/app-data';

store.dispatch(setDataLoadedStatus(true));
store.dispatch(refreshTokensAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer limit={1}/>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
