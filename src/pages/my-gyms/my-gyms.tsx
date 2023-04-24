import {Link} from 'react-router-dom';
import Header from '../../components/header/header';

function MyGyms(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <section className="my-gyms">
          <div className="container">
            <div className="my-gyms__wrapper">
              <button className="btn-flat my-gyms__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="my-gyms__title-wrapper">
                <h1 className="my-gyms__title">Мои залы</h1>
                <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                  <label>
                    <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
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
                <li className="my-gyms__item">
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
                <li className="my-gyms__item">
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
                      <h2 className="thumbnail-gym__title">Neo</h2>
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
                <li className="my-gyms__item">
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
                      <h2 className="thumbnail-gym__title">Globe</h2>
                      <div className="thumbnail-gym__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-gym__location-address">м. Проспект Большевиков</address>
                      </div>
                    </div>
                    <div className="thumbnail-gym__text-wrapper">
                      <p className="thumbnail-gym__text">Известный тренажерный зал с&nbsp;многолетней историей. Профессиональные тренеры по боксу, силовым и&nbsp;другим специальностям.</p>
                    </div>
                    <div className="thumbnail-gym__buttons-wrapper">
                      <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
                    </div>
                  </div>
                </li>
                <li className="my-gyms__item">
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
                <li className="my-gyms__item">
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
              </ul>
              <div className="show-more my-gyms__show-more">
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

export default MyGyms;
