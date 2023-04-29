import {nanoid} from 'nanoid';
import {TrainingType} from '../../types/training-type.enum';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {TrainingLevel} from '../../types/training-level.enum';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {registerUserAction} from '../../store/api-actons';
import {
  getUserName,
  getEmail,
  getPassword,
  getLocation,
  getBirthday,
  getGender,
  getUserRole
} from '../../store/user-data/selectors';
import {AppRoute} from '../../const';
import {useNavigate} from 'react-router-dom';

export const CERTIFICATE_FILE_TYPES = ['jpg', 'pdf', 'png'];

function SignUpQuestionnaireCoach(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userName = useAppSelector(getUserName);
  const email = useAppSelector(getEmail);
  const password = useAppSelector(getPassword);
  const gender = useAppSelector(getGender);
  const birthday = useAppSelector(getBirthday);
  const userRole = useAppSelector(getUserRole);
  const location = useAppSelector(getLocation);

  const [certificate, setCertificate] = useState<File | null>(null);
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([]);
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel | null>(null);
  const [description, setDescription] = useState('');
  const [isReadyToTrain, setIsReadyToTrain] = useState(false);

  const [isTrainingTypesInputUsed, setIsTrainingTypesInputUsed] = useState(false);
  const [isTrainingLevelInputUsed, setIsTrainingLevelInputUsed] = useState(false);
  const [descriptionInputUsed, setDescriptionInputUsed] = useState(false);
  const [imageInputUsed, setImageInputUsed] = useState(false);

  const [imageError, setImageError] = useState('Добавьте подтверждающий документ');
  const [trainingTypesError, setTrainingTypesError] = useState('Выберите типы тренировок');
  const [trainingLevelError, setTrainingLevelError] = useState('Выберите ваш уровень подготовки');
  const [descriptionError, setDescriptionError] = useState('Заполните поле');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!userName) {
      navigate(AppRoute.SignUp);
    }
  }, []);

  useEffect(() => {
    if (imageError || trainingTypesError || trainingLevelError || descriptionError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [imageError, trainingTypesError, trainingLevelError, descriptionError]);

  const checkTrainingTypesNumber = (typesNumber: number) => {
    if (typesNumber < 1) {
      setTrainingTypesError('Выберите типы тренировок');
    }
    if (typesNumber > 3) {
      setTrainingTypesError('Выберите не больше трёх типов тренировок');
    }
    if (typesNumber >= 1 && typesNumber <= 3) {
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

  const handleTrainingLevelInputChange = (level: TrainingLevel) => {
    setTrainingLevel(level);
    setTrainingLevelError('');
    setIsTrainingLevelInputUsed(true);
  };

  const handleDescriptionInputChange = (evt: FormEvent<HTMLTextAreaElement>) => {
    const value = evt.currentTarget.value;
    setDescription(value);
    if (value.length < 10 || value.length > 140) {
      setDescriptionError('Длина описания 10 до 140 символов');
      if (!value) {
        setDescriptionError('Заполните поле');
      }
    } else {
      setDescriptionError('');
    }
  };

  const handleDescriptionInputFocus = () => {
    setDescriptionInputUsed(true);
  };

  const handleCertificateFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = CERTIFICATE_FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

    if (matches && file) {
      setCertificate(file);

      setImageError('');
    } else if (!matches && file) {
      setImageError('Загрузите сюда файлы формата PDF, JPG или PNG');
    } else {
      setImageError('Добавьте подтверждающий документ');
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (isFormValid && gender && userRole && location && trainingLevel) {
      dispatch(registerUserAction({
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
          certificates: [],
          description,
          isReadyToTrain
        }
      }));

      /* if (certificate) {
        const formData = new FormData();
        formData.append('certificate', certificate, 'certificate.pdf');
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5678/users/certificate');
        xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM1OTEyOTgzNTg3NWRiMWExYWVhZGUiLCJlbWFpbCI6ImpvaG5AcXdlLnF3ZSIsInVzZXJOYW1lIjoiSm9obiIsInVzZXJSb2xlIjoi0YLRgNC10L3QtdGAIiwiaWF0IjoxNjgyNzg2NDI0LCJleHAiOjE2ODI3ODczMjR9.SErnzcKniFvw-Q9VgUdIAImb-41V8KsLqMQA5j6AhTo');
        xhr.send(formData);
      } */
    }
    setIsTrainingTypesInputUsed(true);
    setIsTrainingLevelInputUsed(true);
    setDescriptionInputUsed(true);
    setImageInputUsed(true);
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
      <div className="popup-form popup-form--questionnaire-coach">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="get">
                <div className="questionnaire-coach">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-coach__wrapper">
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
                      <div
                        className={`
                          specialization-checkbox
                          questionnaire-coach__specializations
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
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">Ваш уровень</span>
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
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                      <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                        <label className={`${imageInputUsed && imageError ? 'custom-input--error' : ''}`}>
                          <span className="drag-and-drop__label" tabIndex={0}>
                            Загрузите сюда файлы формата PDF, JPG или PNG
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import"></use>
                            </svg>
                          </span>
                          <input
                            onChange={handleCertificateFileInputChange}
                            type="file" name="import" tabIndex={-1} accept=".pdf, .jpg, .png"
                          />
                          <span className="custom-input__error">
                            {imageInputUsed && imageError}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                      <div className="custom-textarea questionnaire-coach__textarea">
                        <label className={`${descriptionInputUsed && descriptionError ? 'custom-input--error' : ''}`}>
                          <textarea
                            className={`${descriptionInputUsed && descriptionError ? 'custom-textarea__error' : ''}`}
                            onFocus={handleDescriptionInputFocus}
                            onChange={handleDescriptionInputChange}
                            value={description}
                            name="description" placeholder=" "
                          >
                          </textarea>
                          <span className="custom-input__error">
                            {descriptionInputUsed && descriptionError}
                          </span>
                        </label>
                      </div>
                      <div className="questionnaire-coach__checkbox">
                        <label>
                          <input onChange={() => setIsReadyToTrain((prevState) => !prevState)} type="checkbox" value="individual-training" name="individual-training"/>
                          <span className="questionnaire-coach__checkbox-icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmitButtonClick}
                    className="btn questionnaire-coach__button"
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

export default SignUpQuestionnaireCoach;
