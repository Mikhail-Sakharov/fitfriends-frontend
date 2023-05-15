import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {fetchMyOrdersAction, fetchMyTrainingsAction, fetchTrainingCatalogAction, fetchTrainingInfoAction, fetchUserInfoAction, updateTrainingAction, uploadVideoFileAction} from '../api-actions';
import {TrainingRdo} from '../../types/training.rdo';
import {UserRdo} from '../../types/user.response';
import {OrderRdo} from '../../types/order.rdo';

type TrainingData = {
  currentTraining: TrainingRdo | null;
  currentRequestTrainings: TrainingRdo[];
  currentRequestOrders: OrderRdo[];
  allExistingTrainings: TrainingRdo[];
  filteredTrainingCatalog: TrainingRdo[];
  trainingCatalog: TrainingRdo[];
  userInfo: UserRdo | null;
};

const initialState: TrainingData = {
  currentTraining: null,
  currentRequestTrainings: [],
  currentRequestOrders: [],
  allExistingTrainings: [],
  filteredTrainingCatalog: [],
  trainingCatalog: [],
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
      })
      .addCase(fetchMyOrdersAction.fulfilled, (state, action) => {
        state.currentRequestOrders = action.payload;
      })
      .addCase(fetchTrainingCatalogAction.fulfilled, (state, action) => {
        state.filteredTrainingCatalog = action.payload[0];
        state.trainingCatalog = action.payload[1];
      });
  }
});

export const {
  setCurrentTraining
} = trainingData.actions;
