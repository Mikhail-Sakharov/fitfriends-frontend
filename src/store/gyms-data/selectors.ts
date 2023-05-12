import {ReducerNameSpace} from '../../const';
import {FavoriteGymRdo} from '../../types/favorite-gym.rdo';
import {GymRdo} from '../../types/gym.rdo';
import {State} from '../../types/state';

export const getCurrentRequestGyms = (state: State): GymRdo[] => state[ReducerNameSpace.GymsData].gymsCatalog;
export const getAllTheGyms = (state: State): GymRdo[] => state[ReducerNameSpace.GymsData].allTheGyms;
export const getMyFavoriteGyms = (state: State): FavoriteGymRdo[] => state[ReducerNameSpace.GymsData].myFavoriteGyms;
export const getCurrentGym = (state: State): GymRdo | null => state[ReducerNameSpace.GymsData].currentGym;
