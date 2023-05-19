import {Link} from 'react-router-dom';
import {UserRdo} from '../../types/user.response';
import {AppRoute, FF_USERS_URL} from '../../const';
import {nanoid} from 'nanoid';

type LookForCompanyItemProps = {
  user: UserRdo;
};

function LookForCompanyItem({user}: LookForCompanyItemProps): JSX.Element {
  return (
    <li className="look-for-company__item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
        <div className="thumbnail-user__image">
          <picture>
            <img src={`${FF_USERS_URL}/${user.avatarUrl}`} width="82" height="82" alt="avatar"/>
          </picture>
        </div>
        <div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-crown"></use>
          </svg>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">
            {user.userName}
          </h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">
              {user.location}
            </address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {
            user.trainingTypes.map((type) => (
              <li key={nanoid()} className="thumbnail-user__hashtags-item">
                <div className="hashtag thumbnail-user__hashtag">
                  <span>
                    {`#${type}`}
                  </span>
                </div>
              </li>
            ))
          }
        </ul>
        <Link
          onClick={() => window.scrollTo(0, 0)}
          className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
          to={`${AppRoute.UserCard}/${user.id}`}
        >
          Подробнее
        </Link>
      </div>
    </li>
  );
}

export default LookForCompanyItem;
