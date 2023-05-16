import {useEffect} from 'react';
import Header from '../../components/header/header';
import UserCardCoach from '../../components/user-card-coach/user-card-coach';
import UserCardUser from '../../components/user-card-user/user-card-user';
import {UserRole} from '../../types/user-role.enum';
import {useParams} from 'react-router-dom';
import {fetchMyFriendsAction, fetchTrainingsAction, fetchUserInfoAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getUserInfo, getUserTrainings} from '../../store/training-data/selectors';
import {getMyFriends} from '../../store/user-data/selectors';

function UserCard(): JSX.Element {
  const dispatch = useAppDispatch();

  const userId = useParams().id;

  const user = useAppSelector(getUserInfo);
  const trainings = useAppSelector(getUserTrainings);
  const myFriends = useAppSelector(getMyFriends);

  useEffect(() => {
    if (myFriends.length === 0) {
      dispatch(fetchMyFriendsAction());
    }
    if (!user && userId) {
      dispatch(fetchUserInfoAction(userId));
    }
    if (trainings.length === 0 && userId && user?.userRole === UserRole.Coach) {
      dispatch(fetchTrainingsAction(userId));
    }
  }, [dispatch, myFriends, trainings, user, user?.userRole, userId]);

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                {
                  user?.userRole === UserRole.Coach
                    ? (
                      <UserCardCoach user={user} trainings={trainings}/>
                    )
                    : (
                      <UserCardUser user={user}/>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UserCard;
