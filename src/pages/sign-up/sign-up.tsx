import {FormEvent, useEffect, useState} from 'react';
import {SubwayStation} from '../../types/subway-station.enum';
import {nanoid} from 'nanoid';
import {Gender} from '../../types/gender.enum';
import {UserRole} from '../../types/user-role.enum';
import {useNavigate} from 'react-router-dom';
import {EMAIL_REG_EXP, AppRoute} from '../../const';

function SignUp(): JSX.Element {
  const navigate = useNavigate();

  const [userAgreementInputChecked, setUserAgreementInputChecked] = useState(true);

  const [isSelectOpened, setIsSelectOpened] = useState(false);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [userRole, setUserRole] = useState('');

  const [userNameInputUsed, setUserNameInputUsed] = useState(false);
  const [emailInputUsed, setEmailInputUsed] = useState(false);
  const [passwordInputUsed, setPasswordInputUsed] = useState(false);
  const [locationInputUsed, setLocationInputUsed] = useState(false);
  const [genderInputUsed, setGenderInputUsed] = useState(false);
  const [birthdayInputUsed, setBirthdayInputUsed] = useState(false);
  const [userRoleInputUsed, setUserRoleInputUsed] = useState(false);

  const [userNameError, setUserNameError] = useState('Заполните поле');
  const [emailError, setEmailError] = useState('Заполните поле');
  const [passwordError, setPasswordError] = useState('Заполните поле');
  const [locationError, setLocationError] = useState('Выберите локацию');
  const [genderError, setGenderError] = useState('Выберите пол');
  const [birthdayError, setBirthdayError] = useState('Выберите дату рождения');
  const [userRoleError, setUserRoleError] = useState('Выберите роль');

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if ([
      userNameError,
      emailError,
      passwordError,
      locationError,
      genderError,
      birthdayError,
      userRoleError
    ].some((item) => !!item)) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userNameError, emailError, passwordError, locationError, genderError, birthdayError, userRoleError]);

  const handleInputFocus = (evt: FormEvent<HTMLInputElement>) => {
    switch(evt.currentTarget.name) {
      case 'name':
        setUserNameInputUsed(true);
        break;
      case 'email':
        setEmailInputUsed(true);
        break;
      case 'password':
        setPasswordInputUsed(true);
        break;
      case 'birthday':
        setBirthdayInputUsed(true);
        break;
    }
  };

  const handleLocationInputFocus = () => {
    setLocationInputUsed(true);
  };

  const handleUserNameInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setUserName(value);
    if (value.length < 1 || value.length > 15) {
      setUserNameError('Длина имени от 1 до 15 символов');
      if (!value) {
        setUserNameError('Заполните поле');
      }
    } else {
      setUserNameError('');
    }
  };

  const handleEmailInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setEmail(value);
    if (!EMAIL_REG_EXP.test(value)) {
      setEmailError('Введите валидный email');
      if (!value) {
        setEmailError('Заполните поле');
      }
    } else {
      setEmailError('');
    }
  };

  const handlePasswordInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setPassword(value);
    if (value.length < 6 || value.length > 12) {
      setPasswordError('Длина пароля от 6 до 12 символов');
      if (!value) {
        setPasswordError('Заполните поле');
      }
    } else {
      setPasswordError('');
    }
  };

  const handleLocationInputClick = (locationValue: SubwayStation) => {
    setLocation(locationValue);
    setIsSelectOpened((prevState) => !prevState);
    if (!locationValue) {
      setLocationError('Выберите локацию');
    } else {
      setLocationError('');
    }
  };

  const handleBirthDayInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setBirthday(value);
    if (!value) {
      setBirthdayError('Выберите дату рождения');
    } else {
      setBirthdayError('');
    }
  };

  const handleGenderInputChange = (genderInputValue: Gender) => {
    setGender(genderInputValue);
    if (!genderInputValue) {
      setGenderError('Выберите пол');
    } else {
      setGenderError('');
    }
  };

  const handleUserRoleInputChange = (userRoleInputValue: UserRole) => {
    setUserRole(userRoleInputValue);
    if (!userRoleInputValue) {
      setUserRoleError('Выберите роль');
    } else {
      setUserRoleError('');
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const registrationData = {
      userName,
      email,
      password,
      location,
      birthday, // convert to XX.XX.XXXX
      gender,
      userRole
    };
    if (formValid) {
      // отправить в store
      console.log(registrationData);
      switch(userRole) {
        case UserRole.Coach:
          navigate(AppRoute.SignUpQuestionnaireCoach);
          break;
        case UserRole.User:
          navigate(AppRoute.SignUpQuestionnaireUser);
          break;
      }
    }
    setUserNameInputUsed(true);
    setEmailInputUsed(true);
    setPasswordInputUsed(true);
    setLocationInputUsed(true);
    setGenderInputUsed(true);
    setBirthdayInputUsed(true);
    setUserRoleInputUsed(true);
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
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <form method="get">
                <div className="sign-up">
                  <div className="sign-up__load-photo">
                    <div className="input-load-avatar">
                      <label>
                        <input className="visually-hidden" type="file" accept="image/png, image/jpeg"/>
                        <span className="input-load-avatar__btn">
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__description">
                      <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                      <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                    </div>
                  </div>
                  <div className="sign-up__data">
                    <div className={`custom-input ${userNameInputUsed && userNameError ? 'custom-input--error' : ''}`}>
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input
                            onChange={handleUserNameInputChange}
                            value={userName}
                            onFocus={handleInputFocus}
                            type="text"
                            name="name"
                          />
                        </span>
                        <span className="custom-input__error">
                          {userNameInputUsed && userNameError}
                        </span>
                      </label>
                    </div>
                    <div className={`custom-input ${emailInputUsed && emailError ? 'custom-input--error' : ''}`}>
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input
                            onChange={handleEmailInputChange}
                            value={email}
                            onFocus={handleInputFocus}
                            type="email"
                            name="email"
                          />
                        </span>
                        <span className="custom-input__error">
                          {emailInputUsed && emailError}
                        </span>
                      </label>
                    </div>
                    <div className={`custom-input ${birthdayInputUsed && birthdayError ? 'custom-input--error' : ''}`}>
                      <label>
                        <span className="custom-input__label">Дата рождения</span>
                        <span className="custom-input__wrapper">
                          <input
                            onFocus={handleInputFocus}
                            onChange={handleBirthDayInputChange}
                            type="date"
                            name="birthday"
                            max="2099-12-31"
                          />
                        </span>
                        <span className="custom-input__error">
                          {birthdayInputUsed && birthdayError}
                        </span>
                      </label>
                    </div>
                    <div className={`
                        custom-select
                        ${location ? 'not-empty' : ''}
                        ${locationInputUsed && locationError ? 'is-invalid' : ''}
                        ${isSelectOpened ? 'is-open' : ''}
                        custom-select--not-selected
                      `}
                    >
                      <span className="custom-select__label">Ваша локация</span>
                      <button
                        onFocus={handleLocationInputFocus}
                        onClick={() => setIsSelectOpened((prevState) => !prevState)}
                        className="custom-select__button"
                        type="button"
                        aria-label="Выберите одну из опций"
                      >
                        <span className="custom-select__text">
                          {location}
                        </span>
                        <span className="custom-select__icon">
                          <svg width="15" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-down"></use>
                          </svg>
                        </span>
                      </button>
                      <ul className="custom-select__list" role="listbox">
                        {
                          Object.values(SubwayStation).map((station) => (
                            <li
                              onClick={() => handleLocationInputClick(station)}
                              key={nanoid()}
                              className="custom-select__item"
                            >
                              {station}
                            </li>
                          ))
                        }
                      </ul>
                      <span className="custom-select__error">
                        {locationInputUsed && locationError}
                      </span>
                    </div>
                    <div className={`custom-input ${passwordInputUsed && passwordError ? 'custom-input--error' : ''}`}>
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            onChange={handlePasswordInputChange}
                            value={password}
                            onFocus={handleInputFocus}
                            type="password"
                            name="password" autoComplete="off"
                          />
                        </span>
                        <span className="custom-input__error">
                          {passwordInputUsed && passwordError}
                        </span>
                      </label>
                    </div>
                    <div className={`sign-up__radio ${genderInputUsed && genderError ? 'custom-input--error' : ''}`}>
                      <span className="sign-up__label">Пол</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big">
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input
                              onFocus={handleInputFocus}
                              onChange={() => handleGenderInputChange(Gender.Male)}
                              type="radio"
                              name="sex"
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">Мужской</span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input
                              onFocus={handleInputFocus}
                              onChange={() => handleGenderInputChange(Gender.Female)}
                              type="radio"
                              name="sex"
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">Женский</span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input
                              onFocus={handleInputFocus}
                              onChange={() => handleGenderInputChange(Gender.Undefined)}
                              type="radio"
                              name="sex"
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">Неважно</span>
                          </label>
                        </div>
                        <span className="custom-input__error">
                          {genderInputUsed && genderError}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`sign-up__role ${userRoleInputUsed && userRoleError ? 'custom-input--error' : ''}`}>
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      <div className="role-btn">
                        <label>
                          <input
                            onChange={() => handleUserRoleInputChange(UserRole.Coach)}
                            className="visually-hidden"
                            type="radio"
                            name="role"
                            value="coach"
                          />
                          <span className="role-btn__icon">
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-cup"></use>
                            </svg>
                          </span>
                          <span className="role-btn__btn">Я хочу тренировать</span>
                        </label>
                      </div>
                      <div className="role-btn">
                        <label>
                          <input
                            onChange={() => handleUserRoleInputChange(UserRole.User)}
                            className="visually-hidden"
                            type="radio"
                            name="role"
                            value="sportsman"
                          />
                          <span className="role-btn__icon">
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-weight"></use>
                            </svg>
                          </span>
                          <span className="role-btn__btn">Я хочу тренироваться</span>
                        </label>
                      </div>
                      <span className="custom-input__error">
                        {userRoleInputUsed && userRoleError}
                      </span>
                    </div>
                  </div>
                  <div className="sign-up__checkbox">
                    <label>
                      <input
                        onChange={() => setUserAgreementInputChecked((prevState) => !prevState)}
                        type="checkbox" value="user-agreement" name="user-agreement"
                        checked={userAgreementInputChecked}
                      />
                      <span className="sign-up__checkbox-icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="sign-up__checkbox-label">
                        Я соглашаюсь с
                        {' '}
                        <span>политикой конфиденциальности</span>
                        {' '}
                        компании
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={handleSubmitButtonClick}
                    className="btn sign-up__button"
                    type="submit"
                    disabled={!userAgreementInputChecked}
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

export default SignUp;
