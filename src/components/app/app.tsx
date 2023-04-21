import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Intro from '../../pages/intro/intro';
import SignUp from '../../pages/sign-up/sign-up';
import SignIn from '../../pages/sign-in/sign-in';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'intro'} element={<Intro />}/>
        <Route path={'signup'} element={<SignUp />}/>
        <Route path={'signin'} element={<SignIn />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
