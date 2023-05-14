import {useEffect, useState} from 'react';
import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchMyFriendsAction, fetchIncomingUserRequestsForTraining, fetchOutgoingUserRequestsForTraining} from '../../store/api-actions';
import {getMyFriends, getMyIncomingRequests, getMyOutgoingRequests} from '../../store/user-data/selectors';
import FriendsListItem from '../../components/friends-list-item/friends-list-item';
import {nanoid} from 'nanoid';
import {getUserRole} from '../../store/auth-process/selectors';
import {UserRole} from '../../types/user-role.enum';
import {AppRoute, MAX_DIFF_IN_MILLISECONDS, MAX_FRIENDS_ITEMS_COUNT_PER_PAGE} from '../../const';
import {useNavigate} from 'react-router-dom';
import {UserRdo} from '../../types/user.response';

function FriendsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const myUserRole = useAppSelector(getUserRole);
  const myFriends = useAppSelector(getMyFriends);
  const myIncomingRequests = useAppSelector(getMyIncomingRequests);
  const myOutgoingRequests = useAppSelector(getMyOutgoingRequests);

  const [currentListPage, setCurrentListPage] = useState(1);
  const pagesCount = Math.ceil(myFriends.length / MAX_FRIENDS_ITEMS_COUNT_PER_PAGE);

  const [onlineFilterChecked, setOnlineFilterChecked] = useState(false);

  const filterOfflineUsers = (user: UserRdo) => {
    const timeNow = Number(new Date());
    const lastTimeUpdated = Number(new Date(user.updatedAt));
    const timeDiff = Math.abs(timeNow - lastTimeUpdated);

    if (onlineFilterChecked && timeDiff > MAX_DIFF_IN_MILLISECONDS) {
      return null;
    } else {
      return user;
    }
  };

  const handleShowMoreButtonClick = () => {
    setCurrentListPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  const findIncomingRequest = (friendId: string) => {
    const friendRequest = myIncomingRequests.find((request) => request.initiatorId === friendId);
    return friendRequest;
  };

  const findOutgoingRequest = (friendId: string) => {
    const friendRequest = myOutgoingRequests.find((request) => request.userId === friendId);
    return friendRequest;
  };

  useEffect(() => {
    dispatch(fetchMyFriendsAction());
    dispatch(fetchIncomingUserRequestsForTraining());
    if (myUserRole === UserRole.User) {
      dispatch(fetchOutgoingUserRequestsForTraining());
    }
  }, [dispatch, myUserRole]);

  const handleOnlineStatusInputChange = () => {
    setOnlineFilterChecked((prevState) => !prevState);
  };

  return (
    <>
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button
                onClick={() => navigate(AppRoute.Intro)}
                className="btn-flat friends-list__back" type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
                <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                  <label>
                    <input
                      onChange={handleOnlineStatusInputChange}
                      type="checkbox" value="user-agreement-1" name="user-agreement"
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">Только онлайн</span>
                  </label>
                </div>
              </div>
              <ul className="friends-list__list">
                {
                  myFriends
                    .filter(filterOfflineUsers)
                    .slice(0, ((currentListPage - 1) * MAX_FRIENDS_ITEMS_COUNT_PER_PAGE) + MAX_FRIENDS_ITEMS_COUNT_PER_PAGE).map((friend) => (
                      <FriendsListItem
                        key={nanoid()}
                        friend={friend}
                        request={findIncomingRequest(friend.id) ?? findOutgoingRequest(friend.id)}
                        userRole={myUserRole}
                      />
                    ))
                }
              </ul>
              <div className="show-more friends-list__show-more">
                {
                  currentListPage >= pagesCount
                    ? (
                      <button
                        onClick={handleReturnToTopButtonClick}
                        className={`btn show-more__button ${pagesCount <= 1 ? 'show-more__button--to-top' : ''}`}
                      >
                        Вернуться в начало
                      </button>
                    )
                    : (
                      <button
                        onClick={handleShowMoreButtonClick}
                        className="btn show-more__button show-more__button--more" type="button"
                      >
                        Показать еще
                      </button>
                    )
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default FriendsList;
