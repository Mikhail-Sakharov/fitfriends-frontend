import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../store';
import {State} from '../../types/state';
import {Action} from 'redux';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import TrainingsFilter from './trainings-filter';

describe('Component: TrainingsFilter', () => {
  const history = createMemoryHistory();
  const middlewares = [thunk.withExtraArgument([api, api])];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    const store = mockStore({
      TRAINING_DATA: {
        allExistingTrainings: []
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <TrainingsFilter />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('trainings-filter')).toBeInTheDocument();
  });
});
