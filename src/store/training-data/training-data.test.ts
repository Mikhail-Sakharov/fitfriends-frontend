import {OrderRdo} from '../../types/order.rdo';
import {ReviewRdo} from '../../types/review.rdo';
import {TrainingRdo} from '../../types/training.rdo';
import {UserRdo} from '../../types/user.response';
import {setCurrentTraining, trainingData} from './training-data';

describe('Reducer: trainingData', () => {
  type TrainingData = {
    currentTraining: TrainingRdo | null;
    currentRequestTrainings: TrainingRdo[];
    currentRequestOrders: OrderRdo[];
    allExistingTrainings: TrainingRdo[];
    filteredTrainingCatalog: TrainingRdo[];
    trainingCatalog: TrainingRdo[];
    recommendedTrainings: TrainingRdo[];
    userTrainings: TrainingRdo[];
    userInfo: UserRdo | null;
    reviews: ReviewRdo[];
  };

  const initialState: TrainingData = {
    currentTraining: null,
    currentRequestTrainings: [],
    currentRequestOrders: [],
    allExistingTrainings: [],
    filteredTrainingCatalog: [],
    trainingCatalog: [],
    recommendedTrainings: [],
    userTrainings: [],
    userInfo: null,
    reviews: []
  };

  const state = {
    currentTraining: null,
    currentRequestTrainings: [],
    currentRequestOrders: [],
    allExistingTrainings: [],
    filteredTrainingCatalog: [],
    trainingCatalog: [],
    recommendedTrainings: [],
    userTrainings: [],
    userInfo: null,
    reviews: []
  };

  it('without additional parameters should return the initial state', () => {
    expect(trainingData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change dataLoadedStatus', () => {
    expect(trainingData.reducer(state, setCurrentTraining(null)))
      .toEqual(
        {
          ...state,
          currentTraining: null,
        }
      );
  });
});
