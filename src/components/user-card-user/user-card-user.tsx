import {nanoid} from 'nanoid';
import {UserQuestionnaire} from '../../types/user.interface';
import {UserRdo} from '../../types/user.response';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setDataLoadedStatus} from '../../store/app-data/app-data';
import {FriendAction} from '../../types/friend-action.enum';
import {addFriendAction, fetchMyFriendsAction, removeFriendAction} from '../../store/api-actions';
import {getMyFriends} from '../../store/user-data/selectors';
import {useEffect, useState} from 'react';
import PopupUserMap from '../popup-user-map/popup-user-map';

type UserCardUserProps = {
  user: UserRdo | null;
};

function UserCardUser({user}: UserCardUserProps): JSX.Element {
  const dispatch = useAppDispatch();

  const myFriends = useAppSelector(getMyFriends);

  const [isMapModalOpened, setIsMapModalOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchMyFriendsAction());
  }, [dispatch]);

  const handleFriendRelations = async (type: FriendAction) => {
    if (user) {
      dispatch(setDataLoadedStatus(true));
      switch(type) {
        case FriendAction.Add:
          await dispatch(addFriendAction(user.id));
          break;
        case FriendAction.Remove:
          await dispatch(removeFriendAction(user.id));
          break;
      }
      await dispatch(fetchMyFriendsAction());
      dispatch(setDataLoadedStatus(false));
    }
  };

  const handleAddFriendButtonClick = () => {
    handleFriendRelations(FriendAction.Add);
  };

  const handleRemoveFriendButtonClick = () => {
    handleFriendRelations(FriendAction.Remove);
  };

  return (
    <>
      <section className="user-card">
        <h1 className="visually-hidden">Карточка пользователя</h1>
        <div className="user-card__wrapper">
          <div className="user-card__content">
            <div className="user-card__head">
              <h2 className="user-card__title">
                {user?.userName}
              </h2>
              <div className="user-card__icon">
                <svg className="user-card__crown" width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-crown"></use>
                </svg>
              </div>
            </div>
            <div
              onClick={() => setIsMapModalOpened(true)}
              className="user-card__label"
            >
              <svg className="user-card__icon-location" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <span>
                {user?.location}
              </span>
            </div>
            {
              (user?.questionnaire as UserQuestionnaire).isReadyToGetTrained
                ? (
                  <div className="user-card__status">
                    <span>Готов к тренировке</span>
                  </div>
                )
                : (
                  <div className="user-card__status">
                    <span>Не готов к тренировке</span>
                  </div>
                )
            }
            <div className="user-card__text">
              <p>
                {(user?.questionnaire as UserQuestionnaire).description}
              </p>
            </div>
            <ul className="user-card__hashtag-list">
              {
                user?.trainingTypes.map((type) => (
                  <li key={nanoid()} className="user-card__hashtag-item">
                    <div className="hashtag">
                      <span>
                        {`#${type}`}
                      </span>
                    </div>
                  </li>
                ))
              }
              <li className="user-card__hashtag-item">
                <div className="hashtag">
                  <span>
                    {`#${user ? user.trainingLevel : ''}`}
                  </span>
                </div>
              </li>
            </ul>
            {
              myFriends.some((friend) => friend.id === user?.id)
                ? (
                  <button
                    onClick={handleRemoveFriendButtonClick}
                    className="btn user-card__btn" type="button"
                  >
                    Удалить из друзей
                  </button>
                )
                : (
                  <button
                    onClick={handleAddFriendButtonClick}
                    className="btn user-card__btn" type="button"
                  >
                    Добавить в друзья
                  </button>
                )
            }
          </div>
          <div className="user-card__gallary">
            <ul className="user-card__gallary-list">
              <li className="user-card__gallary-item">
                <img src="img/content/user-card-photo1.jpg" srcSet="img/content/user-card-photo1@2x.jpg 2x" width="334" height="573" alt="photo1"/>
              </li>
              <li className="user-card__gallary-item">
                <img src="img/content/user-card-photo2.jpg" srcSet="img/content/user-card-photo2@2x.jpg 2x" width="334" height="573" alt="photo2"/>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {
        (isMapModalOpened && user)
          && (
            <PopupUserMap
              location={user.location}
              userName={user.userName}
              setPopupOpened={setIsMapModalOpened}
            />
          )
      }
    </>
  );
}

export default UserCardUser;
