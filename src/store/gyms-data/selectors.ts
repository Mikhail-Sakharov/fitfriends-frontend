import {ReducerNameSpace} from '../../const';
import {GymRdo} from '../../types/gym.rdo';
import {State} from '../../types/state';

export const getGymsCatalog = (state: State): GymRdo[] => state[ReducerNameSpace.GymsData].gymsCatalog;
