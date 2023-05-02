import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getAccessToken, getRefreshToken} from './tokens';
import {StatusCodes} from 'http-status-codes';
import {store} from '../store';
import {refreshTokensAction} from '../store/api-actons';
import {toast} from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.FORBIDDEN]: true,
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const REQUEST_TIMEOUT = 5000;

export const createRefreshTokensAPI = (): AxiosInstance => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getRefreshToken();

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.statusText, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
      }

      throw error;
    }
  );

  return api;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getAccessToken();

      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.statusText, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        });
      }

      if (error.response?.status === 401) {
        store.dispatch(refreshTokensAction());
      }

      throw error;
    }
  );

  return api;
};
