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

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'intro'} element={<Intro />}/>
        <Route path={'signup'} element={<SignUp />}/>
        <Route path={'coach'} element={<SignUpQuestionnaireCoach />}/>
        <Route path={'user'} element={<SignUpQuestionnaireUser />}/>
        <Route path={'main'} element={<Main />}/>
        <Route path={'signin'} element={<SignIn />}/>
        <Route path={'personal-account-coach'} element={<PersonalAccountCoach />}/>
        <Route path={'personal-account-user'} element={<PersonalAccountUser />}/>
        <Route path={'create-training'} element={<CreateTraining />}/>
        <Route path={'my-trainings'} element={<MyTrainings />}/>
        <Route path={'my-orders'} element={<MyOrders />}/>
        <Route path={'friends-list'} element={<FriendsList />}/>
        <Route path={'training-card'} element={<TrainingCard />}/>
        <Route path={'training-catalog'} element={<TrainingCatalog />}/>
        <Route path={'my-purchases'} element={<MyPurchases />}/>
        <Route path={'my-gyms'} element={<MyGyms />}/>
        <Route path={'training-diary'} element={<TrainingDiary />}/>
        <Route path={'food-diary'} element={<FoodDiary />}/>
        <Route path={'gyms-catalog'} element={<GymsCatalog />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
