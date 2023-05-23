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
import FriendsListItem from './friends-list-item';
import {UserRole} from '../../types/user-role.enum';
import {UserRequestRdo} from '../../types/user-request.rdo';
import {UserRdo} from '../../types/user.response';
import {userMock} from '../../mocks/user.mock';
import {userRequestMock} from '../../mocks/user-request.mock';

describe('Component: FriendsListItem', () => {
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
    const request = userRequestMock as unknown as UserRequestRdo;
    const friend = userMock as unknown as UserRdo;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FriendsListItem friend={friend} request={request} userRole={UserRole.User}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('friends-list-item')).toBeInTheDocument();
  });
});
