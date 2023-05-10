import {ReducerNameSpace} from '../../const';
import {OrderRdo} from '../../types/order.rdo';
import {State} from '../../types/state';
import {TrainingRdo} from '../../types/training.rdo';
import {UserRdo} from '../../types/user.response';

export const getCurrentRequestTrainings = (state: State): TrainingRdo[] => state[ReducerNameSpace.TrainingData].currentRequestTrainings;
export const getAllExistingTrainings = (state: State): TrainingRdo[] => state[ReducerNameSpace.TrainingData].allExistingTrainings;
export const getCurrentTraining = (state: State): TrainingRdo | null => state[ReducerNameSpace.TrainingData].currentTraining;
export const getUserInfo = (state: State): UserRdo | null => state[ReducerNameSpace.TrainingData].userInfo;
export const getCurrentRequestOrders = (state: State): OrderRdo[] => state[ReducerNameSpace.TrainingData].currentRequestOrders;
