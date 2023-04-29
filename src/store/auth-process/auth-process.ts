import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, ReducerNameSpace} from '../../const';
import {registerUserAction} from '../api-actons';

type AuthProcess = {
  authorizationStatus: AuthorizationStatus;
};

const initialState: AuthProcess = {
  authorizationStatus: AuthorizationStatus.Unknown
};

export const authProcess = createSlice({
  name: ReducerNameSpace.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
