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
import {userMock} from '../../mocks/user.mock';
import UserCardUser from './user-card-user';

describe('Component: UserCardUser', () => {
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
        myFriends: []
      }
    });
    const user = userMock;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserCardUser user={user}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('user-card-user')).toBeInTheDocument();
  });
});
