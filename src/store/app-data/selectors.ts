import {ReducerNameSpace} from '../../const';
import {State} from '../../types/state';

export const getDataLoadedStatus = (state: State): boolean => state[ReducerNameSpace.AppData].dataLoadedStatus;
export const getCreatedTrainingId = (state: State): string => state[ReducerNameSpace.AppData].createdTrainingId;
