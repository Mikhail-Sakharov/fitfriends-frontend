import {combineReducers} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../const';
import {authProcess} from './auth-process/auth-process';
import {userData} from './user-data/user-data';
import {appData} from './app-data/app-data';

export const rootReducer = combineReducers({
  [ReducerNameSpace.AuthProcess]: authProcess.reducer,
  [ReducerNameSpace.UserData]: userData.reducer,
  [ReducerNameSpace.AppData]: appData.reducer
});
