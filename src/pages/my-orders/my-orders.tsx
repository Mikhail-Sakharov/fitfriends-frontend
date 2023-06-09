import {nanoid} from 'nanoid';
import Header from '../../components/header/header';
import MyOrdersItem from '../../components/my-order-item/my-orders-item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentRequestOrders} from '../../store/training-data/selectors';
import {useEffect, useState} from 'react';
import {fetchMyOrdersAction} from '../../store/api-actions';
import {AppRoute, MAX_ORDERS_COUNT_PER_PAGE} from '../../const';
import {SortType} from '../../types/sort.type';
import {SortOrder} from '../../types/sort-order';
import {useNavigate} from 'react-router-dom';

function MyOrders(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentRequestOrders = useAppSelector(getCurrentRequestOrders);

  const [ordersPage, setOrdersPage] = useState(1);
  const pagesCount = Math.ceil(currentRequestOrders.length / MAX_ORDERS_COUNT_PER_PAGE);

  // выбранный в данный момент тип сортировки
  const [activeSortType, setActiveSortType] = useState<SortType | undefined>(undefined);
  // выбранный в данный момент порядок сортировки
  const [activeSortOrder, setActiveSortOrder] = useState<SortOrder | undefined>(undefined);
  // состояния кнопок сортировки
  const [moneySelectedSortOrder, setMoneySelectedSortOrder] = useState<SortOrder>(SortOrder.Desc);
  const [quantitySelectedSortOrder, setQuantitySelectedSortOrder] = useState<SortOrder>(SortOrder.Desc);

  // проверка и установка активного порядка сортировки
  useEffect(() => {
    switch(activeSortType) {
      case SortType.AmountOfMoney:
        setActiveSortOrder(moneySelectedSortOrder);
        break;
      case SortType.Quantity:
        setActiveSortOrder(quantitySelectedSortOrder);
        break;
    }
  }, [activeSortType, moneySelectedSortOrder, quantitySelectedSortOrder]);

  const handleSortForMoneyButtonClick = () => {
    setActiveSortType(SortType.AmountOfMoney);
    if (activeSortType === SortType.AmountOfMoney) {
      setMoneySelectedSortOrder((prevState) => prevState === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
    }
  };

  const handleSortForQuantityButtonClick = () => {
    setActiveSortType(SortType.Quantity);
    if (activeSortType === SortType.Quantity) {
      setQuantitySelectedSortOrder((prevState) => prevState === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
    }
  };

  const handleShowMoreButtonClick = () => {
    setOrdersPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(fetchMyOrdersAction({
      sortType: activeSortType,
      sortOrder: activeSortOrder
    }));
  }, [activeSortOrder, activeSortType, dispatch]);

  return (
    <>
      <Header />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <button
                onClick={() => navigate(AppRoute.PersonalAccountCoach)}
                className="btn-flat btn-flat--underlined my-orders__back" type="button"
              >
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
                    <button
                      onClick={handleSortForMoneyButtonClick}
                      className="btn-filter-sort" type="button"
                    >
                      <span>Сумме</span>
                      {
                        moneySelectedSortOrder === SortOrder.Desc
                          ? (
                            <svg width="16" height="10" aria-hidden="true">
                              <use xlinkHref="#icon-sort-down"></use>
                            </svg>
                          )
                          : (
                            <svg width="16" height="10" aria-hidden="true">
                              <use xlinkHref="#icon-sort-up"></use>
                            </svg>
                          )
                      }
                    </button>
                    <button
                      onClick={handleSortForQuantityButtonClick}
                      className="btn-filter-sort" type="button"
                    >
                      <span>Количеству</span>
                      {
                        quantitySelectedSortOrder === SortOrder.Desc
                          ? (
                            <svg width="16" height="10" aria-hidden="true">
                              <use xlinkHref="#icon-sort-down"></use>
                            </svg>
                          )
                          : (
                            <svg width="16" height="10" aria-hidden="true">
                              <use xlinkHref="#icon-sort-up"></use>
                            </svg>
                          )
                      }
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {
                  currentRequestOrders.slice(0, ordersPage * MAX_ORDERS_COUNT_PER_PAGE).map((order) => (
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
