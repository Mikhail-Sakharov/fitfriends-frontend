import {Link} from 'react-router-dom';

function MyGymPurchasesItem(): JSX.Element {
  return (
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
  );
}

export default MyGymPurchasesItem;
