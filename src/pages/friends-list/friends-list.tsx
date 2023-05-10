import {useEffect} from 'react';
import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchMyFriendsAction, fetchUserRequestsForTraining} from '../../store/api-actions';
import {getMyFriends, getMyRequests} from '../../store/user-data/selectors';
import FriendsListItem from '../../components/friends-list-item/friends-list-item';
import {nanoid} from 'nanoid';

function FriendsList(): JSX.Element {
  const dispatch = useAppDispatch();

  const myFriends = useAppSelector(getMyFriends);
  const myRequests = useAppSelector(getMyRequests);

  const findRequest = (friendId: string) => {
    const friendRequest = myRequests.find((request) => request.initiatorId === friendId);
    return friendRequest;
  };

  useEffect(() => {
    dispatch(fetchMyFriendsAction());
    dispatch(fetchUserRequestsForTraining());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button className="btn-flat friends-list__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
                <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                  <label>
                    <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
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
                  myFriends.map((friend) => (
                    <FriendsListItem
                      key={nanoid()}
                      friend={friend}
                      request={findRequest(friend.id)}
                    />
                  ))
                }
              </ul>
              <div className="show-more friends-list__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default FriendsList;
