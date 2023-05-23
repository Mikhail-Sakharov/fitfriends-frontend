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
import MyOrdersItem from './my-orders-item';
import {orderMock} from '../../mocks/order.mock';
import {OrderRdo} from '../../types/order.rdo';

describe('Component: MyOrdersItem', () => {
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
    const order = orderMock as unknown as OrderRdo;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyOrdersItem order={order}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('my-orders-item')).toBeInTheDocument();
  });
});
