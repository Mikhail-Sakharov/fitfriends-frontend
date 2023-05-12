import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {fetchGymInfoAction, fetchGymsCatalogAction, fetchMyFavoriteGymsAction} from '../api-actions';
import {GymRdo} from '../../types/gym.rdo';
import {FavoriteGymRdo} from '../../types/favorite-gym.rdo';

type GymsData = {
  gymsCatalog: GymRdo[];
  allTheGyms: GymRdo[];
  myFavoriteGyms: FavoriteGymRdo[];
  currentGym: GymRdo | null;
};

const initialState: GymsData = {
  gymsCatalog: [],
  allTheGyms: [],
  myFavoriteGyms: [],
  currentGym: null
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
      })
      .addCase(fetchGymInfoAction.fulfilled, (state, action) => {
        state.currentGym = action.payload;
      });
  }
});
