import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute, FF_USERS_SERVICE_URL} from '../const';
import {UserRdo, UserResponse} from '../types/user.response';
import {RegisterUserRequestBody} from '../types/register-user-request-body';
import {AppDispatch, State} from '../types/state';
import {saveTokens} from '../services/tokens';

export const registerUserAction = createAsyncThunk<UserResponse, RegisterUserRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/register',
  async (registerUserRequestBody, {dispatch, extra: api}) => {
    const {data} = await api.post<UserResponse>(`${FF_USERS_SERVICE_URL}${APIRoute.Register}`, registerUserRequestBody);
    saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
    return data;
  },
);

export const uploadCertificateAction = createAsyncThunk<UserRdo, FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'users/certificate',
  async (certificate, {dispatch, extra: api}) => {
    const {data} = await api.post<UserRdo>(`${FF_USERS_SERVICE_URL}${APIRoute.Certificate}`, certificate);
    return data;
  },
);
