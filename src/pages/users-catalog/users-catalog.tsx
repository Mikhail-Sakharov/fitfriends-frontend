import Header from '../../components/header/header';
import UsersCatalogItem from '../../components/users-catalog-item/users-catalog-item';
import {useAppSelector} from '../../hooks';
import UsersCatalogFilter from '../../components/users-catalog-filter/users-catalog-filter';
import {getFilteredUsersCatalog} from '../../store/user-data/selectors';
import {nanoid} from 'nanoid';
import {useNavigate} from 'react-router-dom';
import {AppRoute, MAX_USERS_CATALOG_ITEMS_COUNT_PER_PAGE} from '../../const';
import {useState} from 'react';

function UsersCatalog(): JSX.Element {
  const navigate = useNavigate();

  const usersCatalog = useAppSelector(getFilteredUsersCatalog);

  const [currentListPage, setCurrentListPage] = useState(1);
  const pagesCount = Math.ceil(usersCatalog.length / MAX_USERS_CATALOG_ITEMS_COUNT_PER_PAGE);

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
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <button
                    onClick={() => navigate(AppRoute.Main)}
                    className="btn-flat btn-flat--underlined user-catalog-form__btnback" type="button"
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <UsersCatalogFilter />
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {
                      usersCatalog.map((user) => (
                        <UsersCatalogItem key={nanoid()} user={user}/>
                      ))
                    }
                  </ul>
                  <div className="show-more users-catalog__show-more">
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
          </div>
        </section>
      </main>
    </>
  );
}

export default UsersCatalog;
