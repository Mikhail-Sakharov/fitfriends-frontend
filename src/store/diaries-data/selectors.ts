import {ReducerNameSpace} from '../../const';
import {FoodDiaryRdo} from '../../types/food-diary.rdo';
import {State} from '../../types/state';

export const getFoodDiaries = (state: State): FoodDiaryRdo[] => state[ReducerNameSpace.DiariesData].foodDiaries;
