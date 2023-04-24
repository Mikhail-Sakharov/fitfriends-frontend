import {Link} from 'react-router-dom';
import Header from '../../components/header/header';

function GymsCatalog(): JSX.Element {
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
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-01.webp, img/content/thumbnails/gym-01@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-01.jpg" srcSet="img/content/thumbnails/gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-gym__verified">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-verify"></use>
                        </svg>
                      </div>
                      <button className="thumbnail-gym__favourite-button">
                        <span className="visually-hidden">Добавить в Избранное</span>
                        <svg width="14" height="13" aria-hidden="true">
                          <use xlinkHref="#icon-heart"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Reforma</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Адмиралтейская</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Более 200 современных тренажеров, множество дополнительных фитнес-услуг и&nbsp;лучшие тренеры Санкт-Петербурга.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-02.webp, img/content/thumbnails/gym-02@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-02.jpg" srcSet="img/content/thumbnails/gym-02@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-gym__verified">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-verify"></use>
                        </svg>
                      </div>
                      <button className="thumbnail-gym__favourite-button is-active">
                        <span className="visually-hidden">Удалить из Избранного</span>
                        <svg width="12" height="11" aria-hidden="true">
                          <use xlinkHref="#icon-heart-filled"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Neo</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Невский проспект</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Новый, небольшой и&nbsp;уютный спортивный комплекс с&nbsp;современным оборудованием и&nbsp;потрясающим видом на&nbsp;город.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-03.webp, img/content/thumbnails/gym-03@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-03.jpg" srcSet="img/content/thumbnails/gym-03@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <button className="thumbnail-gym__favourite-button">
                        <span className="visually-hidden">Добавить в Избранное</span>
                        <svg width="14" height="13" aria-hidden="true">
                          <use xlinkHref="#icon-heart"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Fitstar</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Звёздная</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Комплекс площадью более 1200 м2, 20&nbsp;зон для проведения разнообразных групповых и&nbsp;индивидуальных тренировок.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-04.webp, img/content/thumbnails/gym-04@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-04.jpg" srcSet="img/content/thumbnails/gym-04@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-gym__verified">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-verify"></use>
                        </svg>
                      </div>
                      <button className="thumbnail-gym__favourite-button is-active">
                        <span className="visually-hidden">Удалить из Избранного</span>
                        <svg width="12" height="11" aria-hidden="true">
                          <use xlinkHref="#icon-heart-filled"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Grand fitness</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Академическая</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Спортивный комплекс премиум-класса с&nbsp;3&nbsp;видами сауны, бассейном длинной 54&nbsp;м., услугами массажиста и&nbsp;большой парковкой.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-05.webp, img/content/thumbnails/gym-05@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-05.jpg" srcSet="img/content/thumbnails/gym-05@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <button className="thumbnail-gym__favourite-button">
                        <span className="visually-hidden">Добавить в Избранное</span>
                        <svg width="14" height="13" aria-hidden="true">
                          <use xlinkHref="#icon-heart"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Атлетика</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Московская</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Большой выбор направлений групповых занятий, от&nbsp;йоги до&nbsp;бокса. После упорной тренировки можно расслабиться в&nbsp;сауне.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-06.webp, img/content/thumbnails/gym-06@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-06.jpg" srcSet="img/content/thumbnails/gym-06@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-gym__verified">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-verify"></use>
                        </svg>
                      </div>
                      <button className="thumbnail-gym__favourite-button is-active">
                        <span className="visually-hidden">Удалить из Избранного</span>
                        <svg width="12" height="11" aria-hidden="true">
                          <use xlinkHref="#icon-heart-filled"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">World Sport</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Адмиралтейская</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Огромный зал с&nbsp;отдельной зоной кроссфит. Разнообразное оборудование для занятий практически любым видом спорта.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-07.webp, img/content/thumbnails/gym-07@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-07.jpg" srcSet="img/content/thumbnails/gym-07@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-gym__verified">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-verify"></use>
                        </svg>
                      </div>
                      <button className="thumbnail-gym__favourite-button">
                        <span className="visually-hidden">Добавить в Избранное</span>
                        <svg width="14" height="13" aria-hidden="true">
                          <use xlinkHref="#icon-heart"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Seven Fit</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Площадь Александра Невского I</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Стильный, современный комплекс в&nbsp;стиле лофт с&nbsp;большой кардио-зоной, зоной кроссфит и&nbsp;залами для тренировок.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-08.webp, img/content/thumbnails/gym-08@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-08.jpg" srcSet="img/content/thumbnails/gym-08@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-gym__verified">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-verify"></use>
                        </svg>
                      </div>
                      <button className="thumbnail-gym__favourite-button is-active">
                        <span className="visually-hidden">Удалить из Избранного</span>
                        <svg width="12" height="11" aria-hidden="true">
                          <use xlinkHref="#icon-heart-filled"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Globe</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Проспект Большевиков</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Известный тренажерный зал с&nbsp;многолетней историей. Профессиональные тренеры по&nbsp;боксу, силовым и&nbsp;другим специальностям.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-09.webp, img/content/thumbnails/gym-09@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-09.jpg" srcSet="img/content/thumbnails/gym-09@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <button className="thumbnail-gym__favourite-button">
                        <span className="visually-hidden">Добавить в Избранное</span>
                        <svg width="14" height="13" aria-hidden="true">
                          <use xlinkHref="#icon-heart"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Ниндзя</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Международная</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Настоящий рай для спортсменов: все виды тренажеров, простор и&nbsp;высокий уровень тренировок вам обеспечен.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-10.webp, img/content/thumbnails/gym-10@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-10.jpg" srcSet="img/content/thumbnails/gym-10@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-gym__verified">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-verify"></use>
                        </svg>
                      </div>
                      <button className="thumbnail-gym__favourite-button is-active">
                        <span className="visually-hidden">Удалить из Избранного</span>
                        <svg width="12" height="11" aria-hidden="true">
                          <use xlinkHref="#icon-heart-filled"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Sport unit</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Московские ворота</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Небольшой стильный спортивный зал с&nbsp;самым необходимым оборудованием. Среди направлений: бокс, пилатес и&nbsp;йога.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-11.webp, img/content/thumbnails/gym-11@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-11.jpg" srcSet="img/content/thumbnails/gym-11@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <button className="thumbnail-gym__favourite-button">
                        <span className="visually-hidden">Добавить в Избранное</span>
                        <svg width="14" height="13" aria-hidden="true">
                          <use xlinkHref="#icon-heart"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Power fit</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Ладожская</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Потрясающий зал с&nbsp;панорамными окнами и&nbsp;вдохновляющим видом на&nbsp;город, огромное разнообразие направлений.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
                  <li className="gyms-catalog__item">
                    <div className="thumbnail-gym">
                      <div className="thumbnail-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/gym-12.webp, img/content/thumbnails/gym-12@2x.webp 2x"/>
                          <img src="img/content/thumbnails/gym-12.jpg" srcSet="img/content/thumbnails/gym-12@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-gym__verified">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-verify"></use>
                        </svg>
                      </div>
                      <button className="thumbnail-gym__favourite-button is-active">
                        <span className="visually-hidden">Удалить из Избранного</span>
                        <svg width="12" height="11" aria-hidden="true">
                          <use xlinkHref="#icon-heart-filled"></use>
                        </svg>
                      </button>
                      <div className="thumbnail-gym__header">
                        <h4 className="thumbnail-gym__title">Fitrepublic</h4>
                        <div className="thumbnail-gym__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-gym__location-address">м. Гостиный двор</address>
                        </div>
                      </div>
                      <div className="thumbnail-gym__text-wrapper">
                        <p className="thumbnail-gym__text">Спортивный комплекс с&nbsp;тренажерным залом, комнатами для групповых занятий и&nbsp;огромным залом для бега.</p>
                      </div>
                      <div className="thumbnail-gym__buttons-wrapper">
                        <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                      </div>
                    </div>
                  </li>
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
