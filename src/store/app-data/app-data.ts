import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {refreshTokensAction, registerUserAction, signInUserAction} from '../api-actons';

type AppData = {
  dataLoadedStatus: boolean;
};

const initialState: AppData = {
  dataLoadedStatus: false
};

export const appData = createSlice({
  name: ReducerNameSpace.AppData,
  initialState,
  reducers: {
    setDataLoadedStatus: (state, action) => {
      state.dataLoadedStatus = action.payload as boolean;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.fulfilled, (state) => {
        state.dataLoadedStatus = false;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.dataLoadedStatus = false;
      })
      .addCase(refreshTokensAction.fulfilled, (state) => {
        state.dataLoadedStatus = false;
      })
      .addCase(refreshTokensAction.rejected, (state) => {
        state.dataLoadedStatus = false;
      })
      .addCase(signInUserAction.fulfilled, (state) => {
        state.dataLoadedStatus = false;
      })
      .addCase(signInUserAction.rejected, (state) => {
        state.dataLoadedStatus = false;
      });
  }
});

export const {
  setDataLoadedStatus
} = appData.actions;
