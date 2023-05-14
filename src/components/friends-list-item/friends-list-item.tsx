import {nanoid} from 'nanoid';
import {FF_USERS_URL, MAX_DIFF_IN_MILLISECONDS} from '../../const';
import {UserRole} from '../../types/user-role.enum';
import {CoachQuestionnaire, UserQuestionnaire} from '../../types/user.interface';
import {UserRdo} from '../../types/user.response';
import {UserRequestRdo} from '../../types/user-request.rdo';
import {Status} from '../../types/status.enum';
import {useAppDispatch} from '../../hooks';
import {UserRequestType} from '../../types/user-request-type.enum';
import {
  changeTrainingRequestStatusAction,
  fetchIncomingUserRequestsForTraining,
  fetchOutgoingUserRequestsForTraining,
  sendTrainingRequestAction
} from '../../store/api-actions';
import {setDataLoadedStatus} from '../../store/app-data/app-data';

type FriendsListItemProps = {
  friend: UserRdo;
  request: UserRequestRdo | undefined;
  userRole: UserRole;
};

function FriendsListItem({friend, request, userRole}: FriendsListItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const timeNow = Number(new Date());
  const lastTimeUpdated = Number(new Date(friend.updatedAt));
  const timeDiff = Math.abs(timeNow - lastTimeUpdated);

  const isUserOnline = !(timeDiff > MAX_DIFF_IN_MILLISECONDS);
  const isReadyForTraining = friend.userRole === UserRole.User
    ? (friend.questionnaire as UserQuestionnaire).isReadyToGetTrained
    : (friend.questionnaire as CoachQuestionnaire).isReadyToTrain;

  const createUserRequest = async () => {
    dispatch(setDataLoadedStatus(true));
    await dispatch(sendTrainingRequestAction({
      type: UserRequestType.Training,
      userId: friend.id
    }));
    dispatch(fetchIncomingUserRequestsForTraining());
    if (userRole === UserRole.User) {
      dispatch(fetchOutgoingUserRequestsForTraining());
    }
    dispatch(setDataLoadedStatus(false));
  };

  const handleInviteButtonClick = () => {
    createUserRequest();
  };

  const dispatchAcceptRequest = async () => {
    if (request) {
      await dispatch(changeTrainingRequestStatusAction({
        trainingRequestStatus: Status.Accepted,
        requestId: request.id
      }));
      dispatch(fetchIncomingUserRequestsForTraining());
      if (userRole === UserRole.User) {
        dispatch(fetchOutgoingUserRequestsForTraining());
      }
    }
  };

  const dispatchRejectRequest = async () => {
    if (request) {
      await dispatch(changeTrainingRequestStatusAction({
        trainingRequestStatus: Status.Rejected,
        requestId: request.id
      }));
      dispatch(fetchIncomingUserRequestsForTraining());
      if (userRole === UserRole.User) {
        dispatch(fetchOutgoingUserRequestsForTraining());
      }
    }
  };

  const handleAcceptTrainingRequestButtonClick = () => {
    dispatchAcceptRequest();
  };

  const handleRejectTrainingRequestButtonClick = () => {
    dispatchRejectRequest();
  };

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
                  {
                    userRole === UserRole.User
                      && (
                        <button
                          onClick={handleInviteButtonClick}
                          className="thumbnail-friend__invite-button" type="button"
                          disabled={!!request}
                        >
                          <svg width="43" height="46" aria-hidden="true" focusable="false">
                            <use xlinkHref="#icon-invite"></use>
                          </svg>
                          <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
                        </button>
                      )
                  }
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
          request?.status === Status.Pending && friend.id === request.initiatorId
            && (
              <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                <div className="thumbnail-friend__button-wrapper">
                  <button
                    onClick={handleAcceptTrainingRequestButtonClick}
                    className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button"
                  >
                    Принять
                  </button>
                  <button
                    onClick={handleRejectTrainingRequestButtonClick}
                    className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button"
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            )
        }
        {
          request?.status === Status.Accepted && friend.id === request.userId
            && (
              <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                {
                  friend.userRole === UserRole.Coach
                    && (
                      <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку принят</p>
                    )
                }
                {
                  friend.userRole === UserRole.User
                    && (
                      <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку принят</p>
                    )
                }
              </div>
            )
        }
        {
          request?.status === Status.Rejected && friend.id === request.userId
            && (
              <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
                {
                  friend.userRole === UserRole.Coach
                    && (
                      <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку отклонён</p>
                    )
                }
                {
                  friend.userRole === UserRole.User
                    && (
                      <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку отклонён</p>
                    )
                }
              </div>
            )
        }
      </div>
    </li>
  );
}

export default FriendsListItem;
