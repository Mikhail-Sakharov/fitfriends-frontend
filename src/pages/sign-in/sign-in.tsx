import {FormEvent, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {signInUserAction} from '../../store/api-actions';
import {setDataLoadedStatus} from '../../store/app-data/app-data';

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setEmail(value);
  };

  const handlePasswordInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setPassword(value);
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setDataLoadedStatus(true));
    dispatch(signInUserAction({
      email,
      password
    }));
  };

  return (
    <main>
      <div className="background-logo">
        <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
          <use xlinkHref="#logo-big"></use>
        </svg>
        <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
          <use xlinkHref="#icon-logotype"></use>
        </svg>
      </div>
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <form method="get">
                <div className="sign-in">
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input
                          onChange={handleEmailInputChange}
                          value={email}
                          type="email" name="email"
                        />
                      </span>
                    </label>
                  </div>
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input
                          onChange={handlePasswordInputChange}
                          value={password}
                          type="password" name="password"
                        />
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={handleSubmitButtonClick}
                    className="btn sign-in__button" type="submit"
                  >
                    Продолжить

                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
