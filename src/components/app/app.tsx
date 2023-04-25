import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
import {AppRoute} from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Intro} element={<Intro />}/>
        <Route path={AppRoute.SignUp} element={<SignUp />}/>
        <Route path={AppRoute.SignUpQuestionnaireCoach} element={<SignUpQuestionnaireCoach />}/>
        <Route path={AppRoute.SignUpQuestionnaireUser} element={<SignUpQuestionnaireUser />}/>
        <Route path={AppRoute.Main} element={<Main />}/>
        <Route path={AppRoute.SignIn} element={<SignIn />}/>
        <Route path={AppRoute.PersonalAccountCoach} element={<PersonalAccountCoach />}/>
        <Route path={AppRoute.PersonalAccountUser} element={<PersonalAccountUser />}/>
        <Route path={AppRoute.CreateTraining} element={<CreateTraining />}/>
        <Route path={AppRoute.MyTrainings} element={<MyTrainings />}/>
        <Route path={AppRoute.MyOrders} element={<MyOrders />}/>
        <Route path={AppRoute.FriendsList} element={<FriendsList />}/>
        <Route path={AppRoute.TrainingCard} element={<TrainingCard />}/>
        <Route path={AppRoute.TrainingCatalog} element={<TrainingCatalog />}/>
        <Route path={AppRoute.MyPurchases} element={<MyPurchases />}/>
        <Route path={AppRoute.MyGyms} element={<MyGyms />}/>
        <Route path={AppRoute.TrainingDiary} element={<TrainingDiary />}/>
        <Route path={AppRoute.FoodDiary} element={<FoodDiary />}/>
        <Route path={AppRoute.GymsCatalog} element={<GymsCatalog />}/>
        <Route path={AppRoute.GymCard} element={<GymCard />}/>
        <Route path={AppRoute.UsersCatalog} element={<UsersCatalog />}/>
        <Route path={AppRoute.UserCard} element={<UserCard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
