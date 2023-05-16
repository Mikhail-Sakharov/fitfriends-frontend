import {Link} from 'react-router-dom';
import {UserRdo} from '../../types/user.response';
import {AppRoute, FF_USERS_URL} from '../../const';
import {nanoid} from 'nanoid';
import {UserRole} from '../../types/user-role.enum';

type UsersCatalogItemProps = {
  user: UserRdo;
};

function UsersCatalogItem({user}: UsersCatalogItemProps): JSX.Element {
  const isUserTop = true; // использовать для определения статуса "топ-пользователь" при необходимости

  return (
    <li className="users-catalog__item">
      <div
        className={`
          thumbnail-user
          ${user.userRole === UserRole.Coach ? 'thumbnail-user--role-coach' : 'thumbnail-user--role-user'}
        `}
      >
        <div className="thumbnail-user__image">
          <picture>
            {
              user.avatarUrl
                && (
                  <img src={`${FF_USERS_URL}/${user.avatarUrl}`} width="82" height="82" alt="user avatar"/>
                )
            }
          </picture>
        </div>
        {
          isUserTop
            && (
              <div
                className={`
                  thumbnail-user__top-status
                  ${user.userRole === UserRole.Coach ? 'thumbnail-user__top-status--role-coach' : 'thumbnail-user__top-status--role-user'}
                `}
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-crown"></use>
                </svg>
              </div>
            )
        }
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
          className={`
            btn btn--medium thumbnail-user__button
            ${user.userRole === UserRole.Coach ? 'btn--dark-bg' : ''}
          `}
          to={`${AppRoute.UserCard}/${user.id}`}
        >
          Подробнее
        </Link>
      </div>
    </li>
  );
}

export default UsersCatalogItem;
