import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFound(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div
      style={{
        paddingTop: '130px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <img src="img/sprite/logo.svg" width="300" height="300" alt="Логотип проекта"/>
      <h1
        style={{
          fontSize: '130px'
        }}
      >
        404
      </h1>
      <h2>
        Page Not Found
      </h2>
      <button
        style={{
          marginTop: '30px',
          width: '350px'
        }}
        onClick={() => navigate(AppRoute.Intro)}
        className="btn" type="button"
      >
        Вернуться на главную
      </button>
    </div>
  );
}

export default NotFound;
