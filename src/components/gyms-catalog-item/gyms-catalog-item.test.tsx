import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';
import HistoryRouter from '../history-router/history-router';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../store';
import {State} from '../../types/state';
import {Action} from 'redux';
import GymsCatalogItem from './gyms-catalog-item';
import {gymMock} from '../../mocks/gym.mock';

describe('Component: GymsCatalogItem', () => {
  const history = createMemoryHistory();
  const middlewares = [thunk.withExtraArgument([api, api])];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
  it('should render correctly', () => {
    history.push(AppRoute.Main);
    const store = mockStore({});
    const gym = gymMock;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GymsCatalogItem gym={gym} isInFavorites/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('gyms-catalog-item')).toBeInTheDocument();
  });
});
