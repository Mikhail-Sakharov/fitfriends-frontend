import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {fetchMyTrainingsAction, fetchTrainingInfoAction, fetchUserInfoAction, updateTrainingAction, uploadVideoFileAction} from '../api-actions';
import {TrainingRdo} from '../../types/training.rdo';
import {UserRdo} from '../../types/user.response';

type TrainingData = {
  currentTraining: TrainingRdo | null;
  currentRequestTrainings: TrainingRdo[];
  allExistingTrainings: TrainingRdo[];
  userInfo: UserRdo | null;
};

const initialState: TrainingData = {
  currentTraining: null,
  currentRequestTrainings: [],
  allExistingTrainings: [],
  userInfo: null
};

export const trainingData = createSlice({
  name: ReducerNameSpace.TrainingData,
  initialState,
  reducers: {
    setCurrentTraining: (state, action) => {
      state.currentTraining = action.payload as TrainingRdo;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMyTrainingsAction.fulfilled, (state, action) => {
        state.currentRequestTrainings = action.payload[0];
        state.allExistingTrainings = action.payload[1];
      })
      .addCase(fetchUserInfoAction.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(fetchTrainingInfoAction.fulfilled, (state, action) => {
        state.currentTraining = action.payload;
      })
      .addCase(updateTrainingAction.fulfilled, (state, action) => {
        state.currentTraining = action.payload;
      })
      .addCase(uploadVideoFileAction.fulfilled, (state, action) => {
        state.currentTraining = action.payload;
      });
  }
});

export const {
  setCurrentTraining
} = trainingData.actions;
