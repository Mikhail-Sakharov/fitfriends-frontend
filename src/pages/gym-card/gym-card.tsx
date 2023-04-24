import Header from '../../components/header/header';

function GymCard(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="gym-card">
                  <h1 className="visually-hidden">Карточка зала</h1>
                  <div className="gym-card__wrapper">
                    <div className="gym-card__content">
                      <div className="gym-card__head">
                        <h2 className="gym-card__title">World sport</h2>
                        <div className="gym-card__icon">
                          <svg className="gym-card__verify-bold" width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-verify-bold"></use>
                          </svg>
                        </div>
                      </div>
                      <p className="gym-card__address">
                        <svg className="gym-card__icon-location" width="12" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <span>м. Адмиралтейская</span>
                      </p>
                      <ul className="gym-card__hashtag-list">
                        <li className="gym-card__hashtag-item">
                          <div className="hashtag hashtag--white">
                            <span>#бассейн</span>
                          </div>
                        </li>
                        <li className="gym-card__hashtag-item">
                          <div className="hashtag hashtag--white">
                            <span>#парковка</span>
                          </div>
                        </li>
                        <li className="gym-card__hashtag-item">
                          <div className="hashtag hashtag--white">
                            <span>#массаж</span>
                          </div>
                        </li>
                        <li className="gym-card__hashtag-item">
                          <div className="hashtag hashtag--white">
                            <span>#для_детей</span>
                          </div>
                        </li>
                      </ul>
                      <div className="gym-card__text">
                        <p>Огромный зал с&nbsp;отдельной зоной кроссфит. Разнообразное оборудование для занятий практически любым видом спорта.</p>
                        <p>Фитнес-клуб World Sport предоставляет полный комплекс фитнес-программ, бассейны, групповой и&nbsp;индивидуальный тренинг, тренажерные залы, детские комнаты, 3&nbsp;вида саун, SPA салоны.</p>
                      </div>
                      <div className="gym-card__rating-price">
                        <div className="gym-card__rating">
                          <div className="rating">
                            <svg className="rating__icon" width="18" height="18" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                            <span className="rating__count">4</span>
                          </div>
                        </div>
                        <div className="gym-card__price">
                          <div className="price-service">
                            <p className="price-service__price">
                              500₽&nbsp;
                              <span>&#47;</span>
&nbsp;занятие
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="gym-card__button">
                        <button className="btn btn--dark-bg" type="button">оформить абонемент</button>
                      </div>
                    </div>
                    <section className="slider-gyms">
                      <h2 className="visually-hidden">Слайдер с фотографиями спортивных залов.</h2>
                      <ul className="slider-gyms__list">
                        <li>
                          <button className="btn-icon slider-gyms__btn slider-gyms__btn--prev" type="button" aria-label="prev">
                            <svg width="16" height="14" aria-hidden="true">
                              <use xlinkHref="#arrow-left"></use>
                            </svg>
                          </button>
                          <button className="btn-icon slider-gyms__btn slider-gyms__btn--next" type="button" aria-label="next">
                            <svg width="16" height="14" aria-hidden="true">
                              <use xlinkHref="#arrow-right"></use>
                            </svg>
                          </button>
                        </li>
                        <li className="slider-gyms__slide slider-gyms__slide slider-gyms__slide--current">
                          <div className="slider-gyms__img">
                            <picture>
                              <source type="image/webp" srcSet="img/content/slider-gyms/gym-01.webp, img/content/slider-gyms/gym-01@2x.webp 2x"/>
                              <img src="img/content/slider-gyms/gym-01.jpg" srcSet="img/content/slider-gyms/gym-01@2x.jpg 2x" width="826" height="773" alt="Фото спортивного снаряжения."/>
                            </picture>
                          </div>
                        </li>
                        <li className="slider-gyms__slide slider-gyms__slide">
                          <div className="slider-gyms__img">
                            <picture>
                              <source type="image/webp" srcSet="img/content/slider-gyms/gym-02.webp, img/content/slider-gyms/gym-02@2x.webp 2x"/>
                              <img src="img/content/slider-gyms/gym-02.jpg" srcSet="img/content/slider-gyms/gym-02@2x.jpg 2x" width="826" height="773" alt="Фото тренажёров."/>
                            </picture>
                          </div>
                        </li>
                        <li className="slider-gyms__slide slider-gyms__slide">
                          <div className="slider-gyms__img">
                            <picture>
                              <source type="image/webp" srcSet="img/content/slider-gyms/gym-03.webp, img/content/slider-gyms/gym-03@2x.webp 2x"/>
                              <img src="img/content/slider-gyms/gym-03.jpg" srcSet="img/content/slider-gyms/gym-03@2x.jpg 2x" width="826" height="773" alt="Фото бассейна."/>
                            </picture>
                          </div>
                        </li>
                      </ul>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default GymCard;
