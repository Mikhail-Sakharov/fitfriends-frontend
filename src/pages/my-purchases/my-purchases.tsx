import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {ChangeEvent, useEffect, useState} from 'react';
import {fetchMyFavoriteGymsAction, fetchMyPurchasesAction} from '../../store/api-actions';
import {getMyPurchases} from '../../store/user-data/selectors';
import {OrderRdo, OrderType} from '../../types/order.rdo';
import {nanoid} from 'nanoid';
import TrainingThumbnail from '../../components/training-thumbnail/training-thumbnail';
import GymsCatalogItem from '../../components/gyms-catalog-item/gyms-catalog-item';
import {getMyFavoriteGyms} from '../../store/gyms-data/selectors';
import {useNavigate} from 'react-router-dom';
import {AppRoute, MAX_PURCHASES_ITEMS_COUNT_PER_PAGE} from '../../const';
import {GymOrderRdo} from '../../types/gym-order.rdo';

function MyPurchases(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const myPurchases = useAppSelector(getMyPurchases);
  const myFavoriteGyms = useAppSelector(getMyFavoriteGyms);

  const isThereGymInPurchases = myPurchases.some((purchase) => purchase.orderType === OrderType.Gym);

  const getFavoriteStatus = (gymId: string) => myFavoriteGyms.some((gym) => gym.gym.id === gymId);

  const [isOnlyActiveFilterChecked, setIsOnlyActiveFilterChecked] = useState(false);
  const [purchaseType, setPurchaseType] = useState<OrderType>(OrderType.Training);

  const [currentListPage, setCurrentListPage] = useState(1);
  const currentPurchasesLength = myPurchases
    .filter((purchase) => isOnlyActiveFilterChecked ? purchase.isCompleted === false : purchase)
    .filter((purchase) => purchase.orderType === purchaseType)
    .slice(0, ((currentListPage - 1) * MAX_PURCHASES_ITEMS_COUNT_PER_PAGE) + MAX_PURCHASES_ITEMS_COUNT_PER_PAGE).length;
  const pagesCount = Math.ceil(currentPurchasesLength / MAX_PURCHASES_ITEMS_COUNT_PER_PAGE);

  const handleShowMoreButtonClick = () => {
    setCurrentListPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(fetchMyPurchasesAction());
    if (isThereGymInPurchases) {
      dispatch(fetchMyFavoriteGymsAction());
    }
  }, [dispatch, isThereGymInPurchases]);

  const handleOnlyActiveInputChange = () => {
    setIsOnlyActiveFilterChecked((prevState) => !prevState);
  };

  const handleSortInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputName = evt.currentTarget.name;
    switch(inputName) {
      case 'sort-gyms':
        setPurchaseType(OrderType.Gym);
        break;
      case 'sort-trainings':
        setPurchaseType(OrderType.Training);
        break;
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button
                onClick={() => navigate(AppRoute.Intro)}
                className="btn-flat my-purchases__back" type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                    <label>
                      <input
                        onChange={handleOnlyActiveInputChange}
                        type="checkbox" value="user-agreement-1" name="user-agreement"
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">Только активные</span>
                    </label>
                  </div>
                  <div className="btn-radio-sort">
                    <label>
                      <input
                        onChange={handleSortInputChange}
                        type="radio" name="sort-gyms" checked={purchaseType === OrderType.Gym}
                      />
                      <span className="btn-radio-sort__label">Абонементы</span>
                    </label>
                    <label>
                      <input
                        onChange={handleSortInputChange}
                        type="radio" name="sort-trainings" checked={purchaseType === OrderType.Training}
                      />
                      <span className="btn-radio-sort__label">Тренировки</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                {
                  myPurchases
                    .filter((purchase) => isOnlyActiveFilterChecked ? purchase.isCompleted === false : purchase)
                    .filter((purchase) => purchase.orderType === purchaseType)
                    .slice(0, ((currentListPage - 1) * MAX_PURCHASES_ITEMS_COUNT_PER_PAGE) + MAX_PURCHASES_ITEMS_COUNT_PER_PAGE).map((purchase) => (
                      purchase.orderType === OrderType.Gym
                        ? (
                          <li key={nanoid()} className="my-purchases__item">
                            <GymsCatalogItem
                              gym={(purchase as GymOrderRdo).gym}
                              isInFavorites={getFavoriteStatus((purchase as GymOrderRdo).gym.id)}
                            />
                          </li>
                        )
                        : (
                          <li key={nanoid()} className="my-purchases__item">
                            <TrainingThumbnail training={(purchase as OrderRdo).training}/>
                          </li>
                        )
                    ))
                }
              </ul>
              <div className="show-more my-purchases__show-more">
                {
                  currentListPage >= pagesCount
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

export default MyPurchases;
