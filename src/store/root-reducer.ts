import {combineReducers} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../const';
import {authProcess} from './auth-process/auth-process';
import {userData} from './user-data/user-data';

export const rootReducer = combineReducers({
  [ReducerNameSpace.Auth]: authProcess.reducer,
  [ReducerNameSpace.User]: userData.reducer
});
