import Header from '../../components/header/header';
import {nanoid} from 'nanoid';
import GymsCatalogItem from '../../components/gyms-catalog-item/gyms-catalog-item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {getGymsCatalog, getMyFavoriteGyms} from '../../store/gyms-data/selectors';
import {fetchGymsCatalogAction, fetchMyFavoriteGymsAction} from '../../store/api-actions';

function GymsCatalog(): JSX.Element {
  const dispatch = useAppDispatch();

  const gymsCatalog = useAppSelector(getGymsCatalog);
  const myFavoriteGyms = useAppSelector(getMyFavoriteGyms);

  const getFavoriteStatus = (gymId: string) => myFavoriteGyms.some((gym) => gym.id === gymId);

  useEffect(() => {
    dispatch(fetchGymsCatalogAction());
    dispatch(fetchMyFavoriteGymsAction());
  }, [dispatch]);

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
                  <form className="gym-hall-form__form">
                    <div className="gym-hall-form__block">
                      <h4 className="gym-hall-form__block-title gym-hall-form__block-title--price">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input type="number" id="text-min" name="text-min" value="0"/>
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input type="number" id="text-max" name="text-max" value="3200"/>
                          <label htmlFor="text-max">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <div className="filter-range__scale">
                          <div className="filter-range__bar">
                            <span className="visually-hidden">Полоса прокрутки</span>
                          </div>
                        </div>
                        <div className="filter-range__control">
                          <button className="filter-range__min-toggle">
                            <span className="visually-hidden">Минимальное значение</span>
                          </button>
                          <button className="filter-range__max-toggle">
                            <span className="visually-hidden">Максимальное значение</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="gym-hall-form__block gym-hall-form__block--location">
                      <h4 className="gym-hall-form__block-title">Локация, станция метро</h4>
                      <ul className="gym-hall-form__check-list">
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="location-1" name="location" checked/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Автово</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="location-1" name="location" checked/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Адмиралтейская</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="location-1" name="location" checked/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Академическая</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="location-1" name="location"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Балтийская</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="location-1" name="location"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Бухарестская</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                      <button className="btn-show-more gym-hall-form__btn-show" type="button">
                        <span>Посмотреть все</span>
                        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="gym-hall-form__block gym-hall-form__block--addition">
                      <h4 className="gym-hall-form__block-title">Дополнительно</h4>
                      <ul className="gym-hall-form__check-list">
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="addition-1" name="addition"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Бассейн</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="addition-1" name="addition"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Парковка</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="addition-1" name="addition"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Массаж</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="addition-1" name="addition"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Детская комната</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-hall-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="addition-1" name="addition" checked/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Сауна</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="gym-hall-form__block">
                      <h3 className="gym-hall-form__title gym-hall-form__title--status">Статус</h3>
                      <div className="custom-toggle custom-toggle--switch">
                        <label>
                          <input type="checkbox" value="status-1" name="status"/>
                          <span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="custom-toggle__label">Только проверенные</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="gyms-catalog">
                <ul className="gyms-catalog__list">
                  {
                    gymsCatalog.map((gym) => (
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
