import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {fetchFoodDiariesAction} from '../api-actions';
import {FoodDiaryRdo} from '../../types/food-diary.rdo';

type DiariesData = {
  foodDiaries: FoodDiaryRdo[];
};

const initialState: DiariesData = {
  foodDiaries: []
};

export const diariesData = createSlice({
  name: ReducerNameSpace.GymsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFoodDiariesAction.fulfilled, (state, action) => {
        state.foodDiaries = action.payload;
      });
  }
});
