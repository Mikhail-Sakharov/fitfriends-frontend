import {CoachQuestionnaire} from '../../types/user.interface';
import {nanoid} from 'nanoid';
import TrainingThumbnail from '../training-thumbnail/training-thumbnail';
import {TrainingRdo} from '../../types/training.rdo';
import {UserRdo} from '../../types/user.response';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getMyFriends} from '../../store/user-data/selectors';
import {addFriendAction, fetchMyFriendsAction, removeFriendAction} from '../../store/api-actions';

enum FriendAction {
  Add = 'add',
  Remove = 'remove'
}

type UserCardCoachProps = {
  user: UserRdo;
  trainings?: TrainingRdo[];
};

function UserCardCoach({user, trainings}: UserCardCoachProps): JSX.Element {
  const dispatch = useAppDispatch();

  const myFriends = useAppSelector(getMyFriends);

  const handleFriendRelations = async (type: FriendAction) => {
    switch(type) {
      case FriendAction.Add:
        await dispatch(addFriendAction(user.id));
        break;
      case FriendAction.Remove:
        await dispatch(removeFriendAction(user.id));
        break;
    }
    dispatch(fetchMyFriendsAction());
  };

  const handleAddFriendButtonClick = () => {
    handleFriendRelations(FriendAction.Add);
  };

  const handleRemoveFriendButtonClick = () => {
    handleFriendRelations(FriendAction.Remove);
  };

  return (
    <section className="user-card-coach">
      <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
      <div className="user-card-coach__wrapper">
        <div className="user-card-coach__card">
          <div className="user-card-coach__content">
            <div className="user-card-coach__head">
              <h2 className="user-card-coach__title">
                {user.userName}
              </h2>
            </div>
            <div className="user-card-coach__label">
              <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <span>
                {user.location}
              </span>
            </div>
            <div className="user-card-coach__status-container">
              <div className="user-card-coach__status user-card-coach__status--tag">
                <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                  <use xlinkHref="#icon-cup"></use>
                </svg>
                <span>Тренер</span>
              </div>
              {
                (user.questionnaire as CoachQuestionnaire).isReadyToTrain
                  ? (
                    <div className="user-card-coach__status user-card-coach__status--check">
                      <span>Готов тренировать</span>
                    </div>
                  )
                  : (
                    <div className="user-card-coach-2__status user-card-coach-2__status--check">
                      <span>Не готов тренировать</span>
                    </div>
                  )
              }
            </div>
            <div className="user-card-coach__text">
              <p>
                {(user.questionnaire as CoachQuestionnaire).description}
              </p>
            </div>
            <button className="btn-flat user-card-coach__sertificate" type="button">
              <svg width="12" height="13" aria-hidden="true">
                <use xlinkHref="#icon-teacher"></use>
              </svg>
              <span>Посмотреть сертификаты</span>
            </button>
            <ul className="user-card-coach__hashtag-list">
              {
                user.trainingTypes.map((trainingType) => (
                  <li key={nanoid()} className="user-card-coach__hashtag-item">
                    <div className="hashtag">
                      <span>
                        #
                        {trainingType}
                      </span>
                    </div>
                  </li>
                ))
              }
            </ul>
            {
              myFriends.some((friend) => friend.id === user.id)
                ? (
                  <button
                    onClick={handleRemoveFriendButtonClick}
                    className="btn user-card-coach__btn" type="button"
                  >
                    Удалить из друзей
                  </button>
                )
                : (
                  <button
                    onClick={handleAddFriendButtonClick}
                    className="btn user-card-coach__btn" type="button"
                  >
                    Добавить в друзья
                  </button>
                )
            }
          </div>
          <div className="user-card-coach__gallary">
            <ul className="user-card-coach__gallary-list">
              <li className="user-card-coach__gallary-item">
                <img src="img/content/user-coach-photo1.jpg" srcSet="img/content/user-coach-photo1@2x.jpg 2x" width="334" height="573" alt="photo1"/>
              </li>
              <li className="user-card-coach__gallary-item">
                <img src="img/content/user-coach-photo2.jpg" srcSet="img/content/user-coach-photo2@2x.jpg 2x" width="334" height="573" alt="photo2"/>
              </li>
            </ul>
          </div>
        </div>
        <div className="user-card-coach__training">
          <div className="user-card-coach__training-head">
            <h2 className="user-card-coach__training-title">Тренировки</h2>
            <div className="user-card-coach__training-bts">
              <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          {
            trainings
              && (
                <ul className="user-card-coach__training-list">
                  {
                    trainings.map((training) => (
                      <li key={nanoid()} className="user-card-coach__training-item">
                        <TrainingThumbnail training={training}/>
                      </li>
                    ))
                  }
                </ul>
              )
          }
          <form className="user-card-coach__training-form">
            {
              (user.questionnaire as CoachQuestionnaire).isReadyToTrain
                && (
                  <button className="btn user-card-coach__btn-training" type="button">Хочу персональную тренировку</button>
                )
            }
            <div className="user-card-coach__training-check">
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserCardCoach;
