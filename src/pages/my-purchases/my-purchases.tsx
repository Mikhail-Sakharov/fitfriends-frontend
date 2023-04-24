import {Link} from 'react-router-dom';
import Header from '../../components/header/header';

function MyPurchases(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button className="btn-flat my-purchases__back" type="button">
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
                      <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
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
                      <input type="radio" name="sort" checked/>
                      <span className="btn-radio-sort__label">Абонементы</span>
                    </label>
                    <label>
                      <input type="radio" name="sort"/>
                      <span className="btn-radio-sort__label">Тренировки</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                <li className="my-purchases__item">
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
                      <h2 className="thumbnail-gym__title">Grand fitness</h2>
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
                <li className="my-purchases__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/training-01.webp, img/content/thumbnails/training-01@2x.webp 2x"/>
                          <img src="img/content/thumbnails/training-01.jpg" srcSet="img/content/thumbnails/training-01@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <p className="thumbnail-training__price">
                        <span className="thumbnail-training__price-value">800</span>
                        <span>₽</span>
                      </p>
                      <h2 className="thumbnail-training__title">energy</h2>
                      <div className="thumbnail-training__info">
                        <ul className="thumbnail-training__hashtags-list">
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#пилатес</span>
                            </div>
                          </li>
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#320ккал</span>
                            </div>
                          </li>
                        </ul>
                        <div className="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <span className="thumbnail-training__rate-value">4</span>
                        </div>
                      </div>
                      <div className="thumbnail-training__text-wrapper">
                        <p className="thumbnail-training__text">Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и&nbsp;координацию.</p>
                      </div>
                      <div className="thumbnail-training__button-wrapper">
                        <Link className="btn btn--small thumbnail-training__button-catalog" to="#">Подробнее</Link>
                        <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to="#">Отзывы</Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="my-purchases__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/training-03.webp, img/content/thumbnails/training-03@2x.webp 2x"/>
                          <img src="img/content/thumbnails/training-03.jpg" srcSet="img/content/thumbnails/training-03@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <p className="thumbnail-training__price">
                        <span className="thumbnail-training__price-value">1000</span>
                        <span>₽</span>
                      </p>
                      <h2 className="thumbnail-training__title">boxing</h2>
                      <div className="thumbnail-training__info">
                        <ul className="thumbnail-training__hashtags-list">
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#бокс</span>
                            </div>
                          </li>
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#800ккал</span>
                            </div>
                          </li>
                        </ul>
                        <div className="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <span className="thumbnail-training__rate-value">5</span>
                        </div>
                      </div>
                      <div className="thumbnail-training__text-wrapper">
                        <p className="thumbnail-training__text">Тренировка на&nbsp;отработку правильных ударов, координации и&nbsp;оптимальной механики защитных движений.</p>
                      </div>
                      <div className="thumbnail-training__button-wrapper">
                        <Link className="btn btn--small thumbnail-training__button-catalog" to="#">Подробнее</Link>
                        <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to="#">Отзывы</Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="my-purchases__item">
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
                      <h2 className="thumbnail-gym__title">Sport unit</h2>
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
                <li className="my-purchases__item">
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
                      <h2 className="thumbnail-gym__title">Fitrepublic</h2>
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
                <li className="my-purchases__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/training-06.webp, img/content/thumbnails/training-06@2x.webp 2x"/>
                          <img src="img/content/thumbnails/training-06.jpg" srcSet="img/content/thumbnails/training-06@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <p className="thumbnail-training__price">
                        <span className="thumbnail-training__price-value">1600</span>
                        <span>₽</span>
                      </p>
                      <h2 className="thumbnail-training__title">run, forrest, run</h2>
                      <div className="thumbnail-training__info">
                        <ul className="thumbnail-training__hashtags-list">
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#бег</span>
                            </div>
                          </li>
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#500ккал</span>
                            </div>
                          </li>
                        </ul>
                        <div className="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <span className="thumbnail-training__rate-value">5</span>
                        </div>
                      </div>
                      <div className="thumbnail-training__text-wrapper">
                        <p className="thumbnail-training__text">Узнайте правильную технику бега, развивайте выносливость и&nbsp;откройте для себя все секреты длительных пробежек.</p>
                      </div>
                      <div className="thumbnail-training__button-wrapper">
                        <Link className="btn btn--small thumbnail-training__button-catalog" to="#">Подробнее</Link>
                        <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to="#">Отзывы</Link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="show-more my-purchases__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default MyPurchases;
