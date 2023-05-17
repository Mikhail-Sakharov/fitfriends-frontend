import Header from '../../components/header/header';
import {nanoid} from 'nanoid';
import GymsCatalogItem from '../../components/gyms-catalog-item/gyms-catalog-item';
import {useAppSelector} from '../../hooks';
import GymsCatalogFilter from '../../components/gyms-catalog-filter/gyms-catalog-filter';
import {getCurrentRequestGyms, getMyFavoriteGyms} from '../../store/gyms-data/selectors';
import {AppRoute, MAX_GYM_ITEMS_COUNT_PER_PAGE} from '../../const';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

function GymsCatalog(): JSX.Element {
  const navigate = useNavigate();
  const currentRequestGyms = useAppSelector(getCurrentRequestGyms);
  const myFavoriteGyms = useAppSelector(getMyFavoriteGyms);

  const [currentListPage, setCurrentListPage] = useState(1);
  const pagesCount = Math.ceil(currentRequestGyms.length / MAX_GYM_ITEMS_COUNT_PER_PAGE);

  const getFavoriteStatus = (gymId: string) => myFavoriteGyms.some((gym) => gym.gym.id === gymId);

  const handleShowMoreButtonClick = () => {
    setCurrentListPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог залов</h1>
              <div className="gym-hall-form">
                <h2 className="visually-hidden">Каталог залов фильтр</h2>
                <div className="gym-hall-form__wrapper">
                  <button
                    onClick={() => navigate(AppRoute.Main)}
                    className="btn-flat btn-flat--underlined gym-hall-form__btnback" type="button"
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="gym-hall-form__title">Фильтры</h3>
                  <GymsCatalogFilter />
                </div>
              </div>
              <div className="gyms-catalog">
                <ul className="gyms-catalog__list">
                  {
                    currentRequestGyms.slice(0, currentListPage * MAX_GYM_ITEMS_COUNT_PER_PAGE).map((gym) => (
                      <li key={nanoid()} className="gyms-catalog__item">
                        <GymsCatalogItem
                          gym={gym}
                          isInFavorites={getFavoriteStatus(gym.id)}
                        />
                      </li>
                    ))
                  }
                </ul>
                <div className="show-more gyms-catalog__show-more">
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
          </div>
        </section>
      </main>
    </>
  );
}

export default GymsCatalog;
