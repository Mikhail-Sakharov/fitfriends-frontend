import {nanoid} from 'nanoid';
import {FF_USERS_URL} from '../../const';
import {UserRole} from '../../types/user-role.enum';
import {CoachQuestionnaire, UserQuestionnaire} from '../../types/user.interface';
import {UserRdo} from '../../types/user.response';
import {UserRequestRdo} from '../../types/user-request.rdo';
import {Status} from '../../types/status.enum';

type FriendsListItemProps = {
  friend: UserRdo;
  request: UserRequestRdo | undefined;
};

function FriendsListItem({friend, request}: FriendsListItemProps): JSX.Element {
  const isUserOnline = true; // TODO: временная заглушка - удалить !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const isReadyForTraining = friend.userRole === UserRole.User
    ? (friend.questionnaire as UserQuestionnaire).isReadyToGetTrained
    : (friend.questionnaire as CoachQuestionnaire).isReadyToTrain;

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div
          className={`
            thumbnail-friend__info
            ${friend.userRole === UserRole.User ? 'thumbnail-friend__info--theme-light' : 'thumbnail-friend__info--theme-dark'}
          `}
        >
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img src={`${FF_USERS_URL}/${friend.avatarUrl}`} width="78" height="78" alt=""/>
              </picture>
              {
                isUserOnline
                  ? (
                    <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>
                  )
                  : (
                    <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-offline"></div>
                  )
              }
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">
              {friend.userName}
            </h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">
                {friend.location}
              </address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {
              friend.trainingTypes.map((type) => (
                <li key={nanoid()}>
                  <div className="hashtag thumbnail-friend__hashtag">
                    <span>
                      {`#${type}`}
                    </span>
                  </div>
                </li>
              ))
            }
          </ul>
          {
            isReadyForTraining
              ? (
                <div className="thumbnail-friend__activity-bar">
                  <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
                    <span>Готов к&nbsp;тренировке</span>
                  </div>
                  <button className="thumbnail-friend__invite-button" type="button">
                    <svg width="43" height="46" aria-hidden="true" focusable="false">
                      <use xlinkHref="#icon-invite"></use>
                    </svg>
                    <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
                  </button>
                </div>
              )
              : (
                <div className="thumbnail-friend__activity-bar">
                  <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                    <span>Не&nbsp;готов к&nbsp;тренировке</span>
                  </div>
                </div>
              )
          }
        </div>
        {
          friend.userRole === UserRole.User && request?.status === Status.Pending
            && (
              <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                <div className="thumbnail-friend__button-wrapper">
                  <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
                  <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
                </div>
              </div>
            )
        }
        {
          request?.status === Status.Accepted
            && (
              <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку принят</p>
              </div>
            )
        }
        {
          request?.status === Status.Rejected
            && (
              <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
                <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку отклонён</p>
              </div>
            )
        }
      </div>
    </li>
  );
}

export default FriendsListItem;
