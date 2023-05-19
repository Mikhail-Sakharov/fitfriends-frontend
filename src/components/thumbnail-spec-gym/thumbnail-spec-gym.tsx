import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getLocation} from '../../store/user-data/selectors';
import {useEffect} from 'react';
import {fetchGymsCatalogAction} from '../../store/api-actions';
import {getAllTheGyms} from '../../store/gyms-data/selectors';

function ThumbnailSpecGym(): JSX.Element {
  const dispatch = useAppDispatch();

  const myLocation = useAppSelector(getLocation);
  const gymsCatalog = useAppSelector(getAllTheGyms);
  const nearestGym = gymsCatalog.filter((gym) => gym.location === myLocation)[0];

  useEffect(() => {
    dispatch(fetchGymsCatalogAction());
  }, [dispatch]);

  return (
    <div className="thumbnail-spec-gym">
      <div className="thumbnail-spec-gym__image">
        <picture>
          <img src={nearestGym ? nearestGym.images[0] : ''} width="330" height="190" alt=""/>
        </picture>
      </div>
      <p className="thumbnail-spec-gym__type">Ближайший зал</p>
      <div className="thumbnail-spec-gym__header">
        <h3 className="thumbnail-spec-gym__title">
          {nearestGym ? nearestGym.title : ''}
        </h3>
        <div className="thumbnail-spec-gym__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-spec-gym__location-address">
            {nearestGym ? `м. ${nearestGym.location}` : ''}
          </address>
        </div>
      </div>
      <div className="thumbnail-spec-gym__button-wrapper">
        <Link className="btn btn--small thumbnail-spec-gym__button" to={`${AppRoute.GymCard}/${nearestGym ? nearestGym.id : ''}`}>Подробнее</Link>
        <Link className="btn btn--small btn--outlined thumbnail-spec-gym__button" to={AppRoute.GymsCatalog}>Все залы</Link>
      </div>
    </div>
  );
}

export default ThumbnailSpecGym;
