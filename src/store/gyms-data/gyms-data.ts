import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {fetchGymsCatalogAction, fetchMyFavoriteGymsAction} from '../api-actions';
import {GymRdo} from '../../types/gym.rdo';
import {FavoriteGymRdo} from '../../types/favorite-gym.rdo';

type GymsData = {
  gymsCatalog: GymRdo[];
  allTheGyms: GymRdo[];
  myFavoriteGyms: FavoriteGymRdo[];
};

const initialState: GymsData = {
  gymsCatalog: [],
  allTheGyms: [],
  myFavoriteGyms: []
};

export const gymsData = createSlice({
  name: ReducerNameSpace.GymsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGymsCatalogAction.fulfilled, (state, action) => {
        state.gymsCatalog = action.payload[0];
        state.allTheGyms = action.payload[1];
      })
      .addCase(fetchMyFavoriteGymsAction.fulfilled, (state, action) => {
        state.myFavoriteGyms = action.payload;
      });
  }
});
