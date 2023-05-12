import {Navigate, Route, Routes} from 'react-router-dom';
import Intro from '../../pages/intro/intro';
import SignUp from '../../pages/sign-up/sign-up';
import SignIn from '../../pages/sign-in/sign-in';
import SignUpQuestionnaireCoach from '../../pages/sign-up-questionnaire-coach/sign-up-questionnaire-coach';
import SignUpQuestionnaireUser from '../../pages/sign-up-questionnaire-user/sign-up-questionnaire-user';
import Main from '../../pages/main/main';
import PersonalAccountCoach from '../../pages/personal-account-coach/personal-account-coach';
import CreateTraining from '../../pages/create-training/create-training';
import MyTrainings from '../../pages/my-trainings/my-trainings';
import MyOrders from '../../pages/my-orders/my-orders';
import FriendsList from '../../pages/friends-list/friends-list';
import TrainingCard from '../../pages/training-card/training-card';
import PersonalAccountUser from '../../pages/personal-account-user/personal-account-user';
import TrainingCatalog from '../../pages/training-catalog/training-catalog';
import MyPurchases from '../../pages/my-purchases/my-purchases';
import MyGyms from '../../pages/my-gyms/my-gyms';
import TrainingDiary from '../../pages/training-diary/training-diary';
import FoodDiary from '../../pages/food-diary/food-diary';
import GymsCatalog from '../../pages/gyms-catalog/gyms-catalog';
import GymCard from '../../pages/gym-card/gym-card';
import UsersCatalog from '../../pages/users-catalog/users-catalog';
import UserCard from '../../pages/user-card/user-card';
import {AppRoute, AuthorizationStatus} from '../../const';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {UserRole} from '../../types/user-role.enum';
import RoleDependentRoute from '../role-dependent-route/role-dependent-route';
import {getAuthorizationStatus, getUserRole} from '../../store/auth-process/selectors';
import {useAppSelector} from '../../hooks';
import {getDataLoadedStatus} from '../../store/app-data/selectors';
import Spinner from '../../pages/spinner/spinner';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userRole = useAppSelector(getUserRole);
  const isDataLoaded = useAppSelector(getDataLoadedStatus);

  if (isDataLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <RoleDependentRoute userRole={userRole}/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Intro}
        element={
          authorizationStatus !== AuthorizationStatus.Auth
            ? <Intro />
            : <Navigate to={AppRoute.Root}/>
        }
      />
      <Route
        path={AppRoute.SignUp}
        element={
          authorizationStatus !== AuthorizationStatus.Auth
            ? <SignUp />
            : <Navigate to={AppRoute.Root}/>
        }
      />
      <Route
        path={AppRoute.SignUpQuestionnaireCoach}
        element={
          authorizationStatus !== AuthorizationStatus.Auth
            ? <SignUpQuestionnaireCoach />
            : <Navigate to={AppRoute.Root}/>
        }
      />
      <Route
        path={AppRoute.SignUpQuestionnaireUser}
        element={
          authorizationStatus !== AuthorizationStatus.Auth
            ? <SignUpQuestionnaireUser />
            : <Navigate to={AppRoute.Root}/>
        }
      />
      <Route
        path={AppRoute.SignIn}
        element={
          authorizationStatus !== AuthorizationStatus.Auth
            ? <SignIn />
            : <Navigate to={AppRoute.Root}/>
        }
      />
      <Route
        path={AppRoute.Main}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <Main />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.PersonalAccountCoach}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.Coach
                ? <PersonalAccountCoach />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.PersonalAccountUser}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <PersonalAccountUser />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.CreateTraining}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.Coach
                ? <CreateTraining />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MyTrainings}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.Coach
                ? <MyTrainings />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MyOrders}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.Coach
                ? <MyOrders />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.FriendsList}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FriendsList />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingCard}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <TrainingCard userRole={userRole}/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingCatalog}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <TrainingCatalog />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MyPurchases}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <MyPurchases />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MyGyms}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <MyGyms />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingDiary}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <TrainingDiary />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.FoodDiary}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <FoodDiary />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.GymsCatalog}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <GymsCatalog />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.GymCardId}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <GymCard />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UsersCatalog}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            {
              userRole === UserRole.User
                ? <UsersCatalog />
                : <Navigate to={AppRoute.Root}/>
            }
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserCard}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <UserCard />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.NotFound} element={<NotFound />}/>
    </Routes>
  );
}

export default App;
