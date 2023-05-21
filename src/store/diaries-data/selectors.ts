import {ReducerNameSpace} from '../../const';
import {FoodDiaryRdo} from '../../types/food-diary.rdo';
import {State} from '../../types/state';
import {TrainingsDiaryRdo} from '../../types/trainings-diary.rdo';

export const getFoodDiaries = (state: State): FoodDiaryRdo[] => state[ReducerNameSpace.DiariesData].foodDiaries;
export const getTrainingDiaries = (state: State): TrainingsDiaryRdo[] => state[ReducerNameSpace.DiariesData].trainingDiaries;
