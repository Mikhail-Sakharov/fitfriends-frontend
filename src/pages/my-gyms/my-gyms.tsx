import Header from '../../components/header/header';
import {nanoid} from 'nanoid';
import GymsCatalogItem from '../../components/gyms-catalog-item/gyms-catalog-item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getMyFavoriteGyms} from '../../store/gyms-data/selectors';
import {useEffect, useState} from 'react';
import {fetchMyFavoriteGymsAction} from '../../store/api-actions';
import {AppRoute, MAX_MY_GYMS_COUNT_PER_PAGE} from '../../const';
import {useNavigate} from 'react-router-dom';
import {getLocation} from '../../store/user-data/selectors';
import {FavoriteGymRdo} from '../../types/favorite-gym.rdo';
import {getNearestPoints} from '../../helpers';

function MyGyms(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const myGyms = useAppSelector(getMyFavoriteGyms);

  const myLocation = useAppSelector(getLocation);
  const nearestGyms = getNearestPoints(myGyms, myLocation);

  const [onlyNearestChecked, setOnlyNearestChecked] = useState(false);

  const filterNearestPoints = (point: FavoriteGymRdo) => {
    if (onlyNearestChecked) {
      return nearestGyms?.some((gym) => gym?.id === point.id);
    } else {
      return point;
    }
  };

  const [currentListPage, setCurrentListPage] = useState(1);
  const pagesCount = onlyNearestChecked && nearestGyms
    ? Math.ceil(nearestGyms.length / MAX_MY_GYMS_COUNT_PER_PAGE)
    : Math.ceil(myGyms.length / MAX_MY_GYMS_COUNT_PER_PAGE);

  useEffect(() => {
    dispatch(fetchMyFavoriteGymsAction());
  }, [dispatch]);

  const handleShowMoreButtonClick = () => {
    setCurrentListPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  const handleOnlyNearestInputChange = () => {
    setOnlyNearestChecked((prevState) => !prevState);
  };

  return (
    <>
      <Header />
      <main>
        <section className="my-gyms">
          <div className="container">
            <div className="my-gyms__wrapper">
              <button
                onClick={() => navigate(AppRoute.PersonalAccountUser)}
                className="btn-flat my-gyms__back" type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="my-gyms__title-wrapper">
                <h1 className="my-gyms__title">Мои залы</h1>
                <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                  <label>
                    <input
                      onChange={handleOnlyNearestInputChange}
                      type="checkbox" value="user-agreement-1" name="user-agreement"
                      checked={onlyNearestChecked}
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">Только рядом</span>
                  </label>
                </div>
              </div>
              <ul className="my-gyms__list">
                {
                  myGyms
                    .filter(filterNearestPoints)
                    .slice(0, ((currentListPage - 1) * MAX_MY_GYMS_COUNT_PER_PAGE) + MAX_MY_GYMS_COUNT_PER_PAGE).map((gym) => (
                      <li key={nanoid()} className="my-gyms__item">
                        <GymsCatalogItem gym={gym.gym} isInFavorites/>
                      </li>
                    ))
                }
              </ul>
              <div className="show-more my-gyms__show-more">
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

export default MyGyms;
