import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, ReducerNameSpace} from '../../const';
import {refreshTokensAction, registerUserAction, signInUserAction} from '../api-actons';
import {UserRole} from '../../types/user-role.enum';

type AuthProcess = {
  authorizationStatus: AuthorizationStatus;
  userRole: UserRole;
};

const initialState: AuthProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userRole: UserRole.User
};

export const authProcess = createSlice({
  name: ReducerNameSpace.AuthProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.user.userRole;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(signInUserAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.user.userRole;
      })
      .addCase(signInUserAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(refreshTokensAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userRole = action.payload.user.userRole;
      })
      .addCase(refreshTokensAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
