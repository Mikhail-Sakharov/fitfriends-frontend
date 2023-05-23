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
import GymsCatalogFilter from './gyms-catalog-filter';

describe('Component: GymsCatalogFilter', () => {
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
      GYMS_DATA: {
        allTheGyms: []
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GymsCatalogFilter />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('gyms-catalog-filter')).toBeInTheDocument();
  });
});
