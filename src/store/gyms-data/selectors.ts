import {ReducerNameSpace} from '../../const';
import {FavoriteGymRdo} from '../../types/favorite-gym.rdo';
import {GymRdo} from '../../types/gym.rdo';
import {State} from '../../types/state';

export const getGymsCatalog = (state: State): GymRdo[] => state[ReducerNameSpace.GymsData].gymsCatalog;
export const getMyFavoriteGyms = (state: State): FavoriteGymRdo[] => state[ReducerNameSpace.GymsData].myFavoriteGyms;
