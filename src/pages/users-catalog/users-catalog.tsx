import Header from '../../components/header/header';
import UsersCatalogItem from '../../components/users-catalog-item/users-catalog-item';
import {useAppSelector} from '../../hooks';
import UsersCatalogFilter from '../../components/users-catalog-filter/users-catalog-filter';
import {getFullUsersCatalog} from '../../store/user-data/selectors';
import {nanoid} from 'nanoid';

function UsersCatalog(): JSX.Element {
  const usersCatalog = useAppSelector(getFullUsersCatalog);

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
                  <button className="btn-flat btn-flat--underlined user-catalog-form__btnback" type="button">
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
                    <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                    <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
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
