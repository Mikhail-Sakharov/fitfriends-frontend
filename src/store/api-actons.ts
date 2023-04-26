import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../const';
import {UserResponse} from '../types/user.response';
import {RegisterUserRequestBody} from '../types/register-user-request-body';
import {AppDispatch, State} from '../types/state';

export const registerUserAction = createAsyncThunk<UserResponse, RegisterUserRequestBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/register',
  async (registerUserRequestBody, {dispatch, extra: api}) => {
    const {data} = await api.post<UserResponse>(APIRoute.Register, registerUserRequestBody);
    // saveToken(data.token);
    // saveUserName(data.userName);
    // saveUserRole(data.userRole);
    return data;
  },
);
