import {combineReducers} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../const';
import {authProcess} from './auth-process/auth-process';
import {userData} from './user-data/user-data';
import {appData} from './app-data/app-data';
import {trainingData} from './training-data/training-data';
import {gymsData} from './gyms-data/gyms-data';

export const rootReducer = combineReducers({
  [ReducerNameSpace.AuthProcess]: authProcess.reducer,
  [ReducerNameSpace.UserData]: userData.reducer,
  [ReducerNameSpace.AppData]: appData.reducer,
  [ReducerNameSpace.TrainingData]: trainingData.reducer,
  [ReducerNameSpace.GymsData]: gymsData.reducer
});
