import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {fetchFoodDiariesAction, fetchTrainingDiariesAction} from '../api-actions';
import {FoodDiaryRdo} from '../../types/food-diary.rdo';
import {TrainingsDiaryRdo} from '../../types/trainings-diary.rdo';

type DiariesData = {
  foodDiaries: FoodDiaryRdo[];
  trainingDiaries: TrainingsDiaryRdo[];
};

const initialState: DiariesData = {
  foodDiaries: [],
  trainingDiaries: []
};

export const diariesData = createSlice({
  name: ReducerNameSpace.GymsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFoodDiariesAction.fulfilled, (state, action) => {
        state.foodDiaries = action.payload;
      })
      .addCase(fetchTrainingDiariesAction.fulfilled, (state, action) => {
        state.trainingDiaries = action.payload;
      });
  }
});
