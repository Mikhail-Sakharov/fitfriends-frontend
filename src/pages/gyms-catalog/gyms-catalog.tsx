import Header from '../../components/header/header';
import {nanoid} from 'nanoid';
import GymsCatalogItem from '../../components/gyms-catalog-item/gyms-catalog-item';
import {useAppSelector} from '../../hooks';
import GymsCatalogFilter from '../../components/gyms-catalog-filter/gyms-catalog-filter';
import {getCurrentRequestGyms, getMyFavoriteGyms} from '../../store/gyms-data/selectors';

function GymsCatalog(): JSX.Element {
  const currentRequestGyms = useAppSelector(getCurrentRequestGyms);
  const myFavoriteGyms = useAppSelector(getMyFavoriteGyms);

  const getFavoriteStatus = (gymId: string) => myFavoriteGyms.some((gym) => gym.gym.id === gymId);

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
                  <button className="btn-flat btn-flat--underlined gym-hall-form__btnback" type="button">
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
                    currentRequestGyms.map((gym) => (
                      <GymsCatalogItem
                        key={nanoid()}
                        gym={gym}
                        isInFavorites={getFavoriteStatus(gym.id)}
                      />
                    ))
                  }
                </ul>
                <div className="show-more gyms-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
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
