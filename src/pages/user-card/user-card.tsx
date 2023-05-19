import {useEffect} from 'react';
import Header from '../../components/header/header';
import UserCardCoach from '../../components/user-card-coach/user-card-coach';
import UserCardUser from '../../components/user-card-user/user-card-user';
import {UserRole} from '../../types/user-role.enum';
import {useParams} from 'react-router-dom';
import {fetchOutgoingUserRequestsForTraining, fetchUserInfoAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getUserInfo} from '../../store/training-data/selectors';

function UserCard(): JSX.Element {
  const dispatch = useAppDispatch();

  const userId = useParams().id;

  const user = useAppSelector(getUserInfo);

  useEffect(() => {
    if (userId && user?.id !== userId) {
      dispatch(fetchUserInfoAction(userId));
    }
    dispatch(fetchOutgoingUserRequestsForTraining());
  }, [dispatch, user, user?.userRole, userId]);

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button
                onClick={() => window.history.back()}
                className="btn-flat inner-page__back" type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                {
                  user?.userRole === UserRole.Coach
                    && (
                      <UserCardCoach coach={user}/>
                    )
                }
                {
                  user?.userRole === UserRole.User
                    && (
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
