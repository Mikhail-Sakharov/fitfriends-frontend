import {Link} from 'react-router-dom';
import {GymRdo} from '../../types/gym.rdo';

type GymsCatalogItemProps = {
  gym: GymRdo;
};

function GymsCatalogItem({gym}: GymsCatalogItemProps): JSX.Element {
  return (
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
  );
}

export default GymsCatalogItem;
