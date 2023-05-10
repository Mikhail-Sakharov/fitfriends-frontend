import {nanoid} from 'nanoid';
import Header from '../../components/header/header';
import MyOrdersItem from '../../components/my-order-item/my-orders-item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentRequestOrders} from '../../store/training-data/selectors';
import {useEffect} from 'react';
import {fetchMyOrdersAction} from '../../store/api-actions';

function MyOrders(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentRequestOrders = useAppSelector(getCurrentRequestOrders);

  useEffect(() => {
    dispatch(fetchMyOrdersAction());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <button className="btn-flat btn-flat--underlined my-orders__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button className="btn-filter-sort" type="button">
                      <span>Сумме</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-up"></use>
                      </svg>
                    </button>
                    <button className="btn-filter-sort" type="button">
                      <span>Количеству</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-down"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {
                  currentRequestOrders.slice().map((order) => (
                    <MyOrdersItem key={nanoid()} order={order}/>
                  ))
                }
              </ul>
              <div className="show-more my-orders__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default MyOrders;
