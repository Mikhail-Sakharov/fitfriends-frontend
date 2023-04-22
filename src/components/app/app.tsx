import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Intro from '../../pages/intro/intro';
import SignUp from '../../pages/sign-up/sign-up';
import SignIn from '../../pages/sign-in/sign-in';
import SignUpQuestionnaireCoach from '../../pages/sign-up-questionnaire-coach/sign-up-questionnaire-coach';
import SignUpQuestionnaireUser from '../../pages/sign-up-questionnaire-user/sign-up-questionnaire-user';
import Main from '../../pages/main/main';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
