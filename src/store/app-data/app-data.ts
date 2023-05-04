import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {createTrainingAction, refreshTokensAction, registerUserAction, signInUserAction} from '../api-actons';

type AppData = {
  dataLoadedStatus: boolean;
  createdTrainingId: string;
};

const initialState: AppData = {
  dataLoadedStatus: false,
  createdTrainingId: ''
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
      })
      .addCase(createTrainingAction.fulfilled, (state, action) => {
        state.createdTrainingId = action.payload.id;
        state.dataLoadedStatus = false;
      })
      .addCase(createTrainingAction.rejected, (state) => {
        state.dataLoadedStatus = false;
      });
  }
});

export const {
  setDataLoadedStatus
} = appData.actions;
