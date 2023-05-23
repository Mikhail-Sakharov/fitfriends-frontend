import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';
import Header from './header';
import HistoryRouter from '../history-router/history-router';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {api} from '../../store';
import {State} from '../../types/state';
import {Action} from 'redux';

describe('Component: Header', () => {
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
      USER_DATA: {
        notifications: []
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
