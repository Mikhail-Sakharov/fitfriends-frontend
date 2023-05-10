import {nanoid} from 'nanoid';
import Header from '../../components/header/header';
import MyOrdersItem from '../../components/my-order-item/my-orders-item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentRequestOrders} from '../../store/training-data/selectors';
import {useEffect, useState} from 'react';
import {fetchMyOrdersAction} from '../../store/api-actions';
import {MAX_ORDERS_COUNT_PER_PAGE} from '../../const';

function MyOrders(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentRequestOrders = useAppSelector(getCurrentRequestOrders);

  const [ordersPage, setOrdersPage] = useState(1);
  const pagesCount = Math.ceil(currentRequestOrders.length / MAX_ORDERS_COUNT_PER_PAGE);

  const handleShowMoreButtonClick = () => {
    setOrdersPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

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
                  currentRequestOrders.slice(0, ((ordersPage - 1) * MAX_ORDERS_COUNT_PER_PAGE) + MAX_ORDERS_COUNT_PER_PAGE).map((order) => (
                    <MyOrdersItem key={nanoid()} order={order}/>
                  ))
                }
              </ul>
              <div className="show-more my-orders__show-more">
                {
                  ordersPage >= pagesCount
                    ? (
                      <button
                        onClick={handleReturnToTopButtonClick}
                        className={`btn show-more__button ${pagesCount <= 1 ? 'show-more__button--to-top' : ''}`}
                      >
                        Вернуться в начало
                      </button>
                    )
                    : (
                      <button
                        onClick={handleShowMoreButtonClick}
                        className="btn show-more__button show-more__button--more" type="button"
                      >
                        Показать еще
                      </button>
                    )
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default MyOrders;
