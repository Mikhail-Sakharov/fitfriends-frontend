import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {fetchGymsCatalogAction} from '../api-actions';
import {GymRdo} from '../../types/gym.rdo';

type GymsData = {
  gymsCatalog: GymRdo[];
};

const initialState: GymsData = {
  gymsCatalog: []
};

export const gymsData = createSlice({
  name: ReducerNameSpace.GymsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGymsCatalogAction.fulfilled, (state, action) => {
        state.gymsCatalog = action.payload;
      });
  }
});
