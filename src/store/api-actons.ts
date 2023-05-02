import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, FF_USERS_SERVICE_URL} from '../const';
import {UserRdo, UserResponse} from '../types/user.response';
import {RegisterUserRequestBody} from '../types/register-user-request-body';
import {AppDispatch, State} from '../types/state';
import {saveTokens} from '../services/tokens';
import {SignInUserRequestBody} from '../types/sign-in-user-request-body';

export const registerUserAction = createAsyncThunk<UserResponse, RegisterUserRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'auth/register',
  async (registerUserRequestBody, {dispatch, extra: api}) => {
    const {data} = await api[0].post<UserResponse>(`${FF_USERS_SERVICE_URL}${APIRoute.Register}`, registerUserRequestBody);
    saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
    return data;
  },
);

export const signInUserAction = createAsyncThunk<UserResponse, SignInUserRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'auth/signin',
  async (signInUserRequestBody, {dispatch, extra: api}) => {
    const {data} = await api[0].post<UserResponse>(`${FF_USERS_SERVICE_URL}${APIRoute.Login}`, signInUserRequestBody);
    saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
    return data;
  },
);

export const uploadCertificateAction = createAsyncThunk<UserRdo, FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'users/certificate',
  async (certificate, {dispatch, extra: api}) => {
    const {data} = await api[0].post<UserRdo>(`${FF_USERS_SERVICE_URL}${APIRoute.Certificate}`, certificate);
    return data;
  },
);

export const uploadAvatarAction = createAsyncThunk<UserRdo, FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'users/avatar',
  async (avatar, {dispatch, extra: api}) => {
    const {data} = await api[0].post<UserRdo>(`${FF_USERS_SERVICE_URL}${APIRoute.Avatar}`, avatar);
    return data;
  },
);

export const refreshTokensAction = createAsyncThunk<UserResponse, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance[];
}>(
  'auth/refresh',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api[1].get<UserResponse>(`${FF_USERS_SERVICE_URL}${APIRoute.Refresh}`);
    saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
    return data;
  },
);
