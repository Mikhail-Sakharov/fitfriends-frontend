import {nanoid} from 'nanoid';
import {TrainingType} from '../../types/training-type.enum';
import {FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useNavigate} from 'react-router-dom';
import {getAvatar, getUserName, getEmail, getPassword, getGender, getBirthday, getUserRole, getLocation} from '../../store/user-data/selectors';
import {AppRoute, TrainingTypesCount, UserDailyCaloriesCount, UserTotalCaloriesCount} from '../../const';
import {TrainingLevel} from '../../types/training-level.enum';
import {Duration} from '../../types/duration.enum';
import {registerUserAction, uploadAvatarAction} from '../../store/api-actons';
import {setDataLoadedStatus} from '../../store/app-data/app-data';

function SignUpQuestionnaireUser(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // возвращаем общие данные из состояния (т.е. без опросника)
  const avatar = useAppSelector(getAvatar);
  const userName = useAppSelector(getUserName);
  const email = useAppSelector(getEmail);
  const password = useAppSelector(getPassword);
  const gender = useAppSelector(getGender);
  const birthday = useAppSelector(getBirthday);
  const userRole = useAppSelector(getUserRole);
  const location = useAppSelector(getLocation);

  // значения полей
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([]);
  const [trainingDuration, setTrainingDuration] = useState<Duration | null>(null);
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel | null>(null);
  const [totalCaloriesCount, setTotalCaloriesCount] = useState<number>(0);
  const [dailyCaloriesCount, setDailyCaloriesCount] = useState<number>(0);

  // dirty input?
  const [isTrainingTypesInputUsed, setIsTrainingTypesInputUsed] = useState(false);
  const [isDurationInputUsed, setIsDurationInputUsed] = useState(false);
  const [isTrainingLevelInputUsed, setIsTrainingLevelInputUsed] = useState(false);
  const [isTotalCaloriesInputUsed, setIsTotalCaloriesInputUsed] = useState(false);
  const [isDailyCaloriesInputUsed, setIsDailyCaloriesInputUsed] = useState(false);

  // текст ошибки
  const [trainingTypesError, setTrainingTypesError] = useState('Выберите типы тренировок');
  const [durationError, setDurationError] = useState('Выберите продолжительность');
  const [trainingLevelError, setTrainingLevelError] = useState('Выберите ваш уровень подготовки');
  const [totalCaloriesError, setTotalCaloriesError] = useState('Заполните поле');
  const [dailyCaloriesError, setDailyCaloriesError] = useState('Заполните поле');

  // валидны ли данные формы или нет
  const [isFormValid, setIsFormValid] = useState(false);

  // если первая часть не заполнена, возвращаем пользователя обратно на первый шаг
  // проверяем только при монтировании компонента
  useEffect(() => {
    if (!userName) {
      navigate(AppRoute.SignUp);
    }
  }, []);

  // устанавливаем флаг валидности формы на каждой отрисовке
  useEffect(() => {
    if (trainingTypesError || trainingLevelError || durationError || totalCaloriesError || dailyCaloriesError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [trainingTypesError, trainingLevelError, durationError, totalCaloriesError, dailyCaloriesError]);

  const checkTrainingTypesNumber = (typesNumber: number) => {
    if (typesNumber < TrainingTypesCount.MIN) {
      setTrainingTypesError('Выберите типы тренировок');
    }
    if (typesNumber > TrainingTypesCount.MAX) {
      setTrainingTypesError(`Выберите не больше ${TrainingTypesCount.MAX} типов тренировок`);
    }
    if (typesNumber >= TrainingTypesCount.MIN && typesNumber <= TrainingTypesCount.MAX) {
      setTrainingTypesError('');
    }
  };

  const handleSpecializationInputChange = (trainingType: TrainingType) => {
    if (trainingTypes.includes(trainingType)) {
      setTrainingTypes((prevState) => {
        const updatedState = prevState.filter((type) => type !== trainingType);
        checkTrainingTypesNumber(updatedState.length);
        return updatedState;
      });
    } else {
      setTrainingTypes((prevState) => {
        const updatedState = [...prevState, trainingType];
        checkTrainingTypesNumber(updatedState.length);
        return updatedState;
      });
    }
    setIsTrainingTypesInputUsed(true);
  };

  const handleDurationInputChange = (durationValue: Duration)=> {
    setTrainingDuration(durationValue);
    setDurationError('');
    setIsDurationInputUsed(true);
  };

  const handleTrainingLevelInputChange = (level: TrainingLevel) => {
    setTrainingLevel(level);
    setTrainingLevelError('');
    setIsTrainingLevelInputUsed(true);
  };

  const handleTotalCaloriesInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
    setTotalCaloriesCount(value);
    if (value < UserTotalCaloriesCount.MIN || value > UserTotalCaloriesCount.MAX) {
      setTotalCaloriesError(`Значение должно быть от ${UserTotalCaloriesCount.MIN} до ${UserTotalCaloriesCount.MAX}`);
      if (!value) {
        setTotalCaloriesError('Заполните поле');
      }
    } else {
      setTotalCaloriesError('');
    }
  };

  const handleDailyCaloriesInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
    setDailyCaloriesCount(value);
    if (value < UserDailyCaloriesCount.MIN || value > UserDailyCaloriesCount.MAX) {
      setDailyCaloriesError(`Значение должно быть от ${UserDailyCaloriesCount.MIN} до ${UserDailyCaloriesCount.MAX}`);
      if (!value) {
        setDailyCaloriesError('Заполните поле');
      }
    } else {
      setDailyCaloriesError('');
    }
  };

  const handleCaloriesInputFocus = (evt: FormEvent<HTMLInputElement>) => {
    switch(evt.currentTarget.name) {
      case 'calories-lose':
        setIsTotalCaloriesInputUsed(true);
        break;
      case 'calories-waste':
        setIsDailyCaloriesInputUsed(true);
        break;
    }
  };

  const dispatchFormData = async () => {
    if (isFormValid && gender && trainingDuration && userRole && location && trainingLevel) {
      dispatch(setDataLoadedStatus(true));
      await dispatch(registerUserAction({
        userName,
        email,
        password,
        gender,
        birthday,
        userRole,
        location,
        trainingLevel,
        trainingTypes,
        questionnaire: {
          trainingDuration,
          dailyCaloriesCount,
          totalCaloriesCount,
          description: '',
          isReadyToGetTrained: true
        }
      }));

      if (avatar) {
        const file = fetch(avatar)
          .then((r) => r.blob())
          .then((blobFile) => new File([blobFile], 'avatar', {type: 'image/png'}));

        const avatarFile = await file;
        const avatarFileName = avatarFile.name;
        const avatarType = avatarFile.type.match(/(?<=\/).+/);

        const formData = new FormData();
        formData.append('avatar', avatarFile, `${avatarFileName}.${avatarType ? avatarType[0] : ''}`);
        dispatch(uploadAvatarAction(formData));
        URL.revokeObjectURL(avatar);
      }
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatchFormData();
    setIsTrainingTypesInputUsed(true);
    setIsTrainingLevelInputUsed(true);
    setIsDurationInputUsed(true);
    setIsTotalCaloriesInputUsed(true);
    setIsDailyCaloriesInputUsed(true);
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
      <div className="popup-form popup-form--questionnaire-user">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="get">
                <div className="questionnaire-user">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-user__wrapper">
                    <div className="questionnaire-user__block">
                      <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                      <div
                        className={`
                          specialization-checkbox
                          questionnaire-user__specializations
                          ${isTrainingTypesInputUsed && trainingTypesError ? 'custom-input--error' : ''}
                        `}
                      >
                        {
                          Object.entries(TrainingType).map((entry) => (
                            <div key={nanoid()} className="btn-checkbox">
                              <label>
                                <input
                                  onChange={() => handleSpecializationInputChange(entry[1])}
                                  className="visually-hidden"
                                  type="checkbox"
                                  name="specialisation"
                                  value={entry[0].toLowerCase()}
                                  checked={trainingTypes.includes(entry[1])}
                                />
                                <span className="btn-checkbox__btn">
                                  {entry[1].split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                                </span>
                              </label>
                            </div>
                          ))
                        }
                        <span className="custom-input__error">
                          {isTrainingTypesInputUsed && trainingTypesError}
                        </span>
                      </div>
                    </div>
                    <div className="questionnaire-user__block">
                      <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                      <div
                        className={`
                          custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio
                          ${isDurationInputUsed && durationError ? 'custom-input--error' : ''}
                        `}
                      >
                        {
                          Object.values(Duration).map((value) => (
                            <div key={nanoid()} className="custom-toggle-radio__block">
                              <label>
                                <input
                                  onChange={() => handleDurationInputChange(value)}
                                  checked={value === trainingDuration}
                                  type="radio" name="time"
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">
                                  {value}
                                </span>
                              </label>
                            </div>
                          ))
                        }
                        <span className="custom-input__error">
                          {isDurationInputUsed && durationError}
                        </span>
                      </div>
                    </div>
                    <div className="questionnaire-user__block">
                      <span className="questionnaire-user__legend">Ваш уровень</span>
                      <div
                        className={`
                          custom-toggle-radio
                          custom-toggle-radio--big
                          questionnaire-coach__radio
                          ${isTrainingLevelInputUsed && trainingLevelError ? 'custom-input--error' : ''}
                        `}
                      >
                        {
                          Object.values(TrainingLevel).map((level) => (
                            <div key={nanoid()} className="custom-toggle-radio__block">
                              <label>
                                <input
                                  onChange={() => handleTrainingLevelInputChange(level)}
                                  checked={level === trainingLevel}
                                  type="radio" name="level"
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">
                                  {level.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                                </span>
                              </label>
                            </div>
                          ))
                        }
                        <span className="custom-input__error">
                          {isTrainingLevelInputUsed && trainingLevelError}
                        </span>
                      </div>
                    </div>
                    <div className="questionnaire-user__block">
                      <div className="questionnaire-user__calories-lose">
                        <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label className={`${isTotalCaloriesInputUsed && totalCaloriesError ? 'custom-input--error' : ''}`}>
                            <span className="custom-input__wrapper">
                              <input
                                onChange={handleTotalCaloriesInputChange}
                                value={totalCaloriesCount?.toString()}
                                onFocus={handleCaloriesInputFocus}
                                type="number" name="calories-lose"
                              />
                              <span className="custom-input__text">ккал</span>
                            </span>
                            <span className="custom-input__error">
                              {isTotalCaloriesInputUsed && totalCaloriesError}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-user__calories-waste">
                        <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label className={`${isDailyCaloriesInputUsed && dailyCaloriesError ? 'custom-input--error' : ''}`}>
                            <span className="custom-input__wrapper">
                              <input
                                onChange={handleDailyCaloriesInputChange}
                                value={dailyCaloriesCount?.toString()}
                                onFocus={handleCaloriesInputFocus}
                                type="number" name="calories-waste"
                              />
                              <span className="custom-input__text">ккал</span>
                            </span>
                            <span className="custom-input__error">
                              {isDailyCaloriesInputUsed && dailyCaloriesError}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmitButtonClick}
                    className="btn questionnaire-user__button"
                    type="submit"
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

export default SignUpQuestionnaireUser;
