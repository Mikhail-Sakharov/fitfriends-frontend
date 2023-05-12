import {Link} from 'react-router-dom';
import {GymRdo} from '../../types/gym.rdo';

type GymsCatalogItemProps = {
  gym: GymRdo;
  isInFavorites: boolean;
};

function GymsCatalogItem({gym, isInFavorites}: GymsCatalogItemProps): JSX.Element {
  return (
    <li className="gyms-catalog__item">
      <div className="thumbnail-gym">
        <div className="thumbnail-gym__image">
          <picture>
            <img src={gym.images[0]} width="330" height="190" alt=""/>
          </picture>
        </div>
        {
          gym.isVerified
            && (
              <div className="thumbnail-gym__verified">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-verify"></use>
                </svg>
              </div>
            )
        }
        {
          isInFavorites
            ? (
              <button className="thumbnail-gym__favourite-button is-active">
                <span className="visually-hidden">Удалить из Избранного</span>
                <svg width="12" height="11" aria-hidden="true">
                  <use xlinkHref="#icon-heart-filled"></use>
                </svg>
              </button>
            )
            : (
              <button className="thumbnail-gym__favourite-button">
                <span className="visually-hidden">Добавить в Избранное</span>
                <svg width="14" height="13" aria-hidden="true">
                  <use xlinkHref="#icon-heart"></use>
                </svg>
              </button>
            )
        }
        <div className="thumbnail-gym__header">
          <h4 className="thumbnail-gym__title">
            {gym.title}
          </h4>
          <div className="thumbnail-gym__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-gym__location-address">
              {gym.location}
            </address>
          </div>
        </div>
        <div className="thumbnail-gym__text-wrapper">
          <p className="thumbnail-gym__text">
            {gym.description}
          </p>
        </div>
        <div className="thumbnail-gym__buttons-wrapper">
          <Link className="btn btn--small thumbnail-gym__button" to="#">Подробнее</Link>
        </div>
      </div>
    </li>
  );
}

export default GymsCatalogItem;
