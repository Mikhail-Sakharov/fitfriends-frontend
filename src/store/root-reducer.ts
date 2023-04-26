import {combineReducers} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../const';
import {authProcess} from './user-process/auth-process';

export const rootReducer = combineReducers({
  [ReducerNameSpace.Auth]: authProcess.reducer
});
