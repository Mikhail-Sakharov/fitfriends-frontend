import {nanoid} from 'nanoid';
import {TrainingType} from '../../types/training-type.enum';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {TrainingLevel} from '../../types/training-level.enum';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {registerUserAction, uploadAvatarAction, uploadCertificateAction} from '../../store/api-actons';
import {
  getUserName,
  getEmail,
  getPassword,
  getLocation,
  getBirthday,
  getGender,
  getUserRole,
  getAvatar
} from '../../store/user-data/selectors';
import {AppRoute, CERTIFICATE_FILE_TYPES, CoachDescriptionLength, TrainingTypesCount} from '../../const';
import {useNavigate} from 'react-router-dom';

function SignUpQuestionnaireCoach(): JSX.Element {
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
  const [certificate, setCertificate] = useState<File | null>(null);
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([]);
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel | null>(null);
  const [description, setDescription] = useState('');
  const [isReadyToTrain, setIsReadyToTrain] = useState(false);

  // был ли инпут в фокусе
  const [isTrainingTypesInputUsed, setIsTrainingTypesInputUsed] = useState(false);
  const [isTrainingLevelInputUsed, setIsTrainingLevelInputUsed] = useState(false);
  const [descriptionInputUsed, setDescriptionInputUsed] = useState(false);
  const [imageInputUsed, setImageInputUsed] = useState(false);

  // текст ошибки
  const [certificateError, setCertificateError] = useState('Добавьте подтверждающий документ');
  const [trainingTypesError, setTrainingTypesError] = useState('Выберите типы тренировок');
  const [trainingLevelError, setTrainingLevelError] = useState('Выберите ваш уровень подготовки');
  const [descriptionError, setDescriptionError] = useState('Заполните поле');

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
    if (certificateError || trainingTypesError || trainingLevelError || descriptionError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [certificateError, trainingTypesError, trainingLevelError, descriptionError]);

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

  const handleTrainingLevelInputChange = (level: TrainingLevel) => {
    setTrainingLevel(level);
    setTrainingLevelError('');
    setIsTrainingLevelInputUsed(true);
  };

  const handleDescriptionInputChange = (evt: FormEvent<HTMLTextAreaElement>) => {
    const value = evt.currentTarget.value;
    setDescription(value);
    if (value.length < CoachDescriptionLength.MIN || value.length > CoachDescriptionLength.MAX) {
      setDescriptionError(`Длина описания от ${CoachDescriptionLength.MIN} до ${CoachDescriptionLength.MAX} символов`);
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

      setCertificateError('');
    } else if (!matches && file) {
      setCertificateError('Загрузите сюда файлы формата PDF, JPG или PNG');
    } else {
      setCertificateError('Добавьте подтверждающий документ');
    }
  };

  const dispatchFormData = async () => {
    if (isFormValid && gender && userRole && location && trainingLevel) {
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
          certificates: [],
          description,
          isReadyToTrain
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

      if (certificate) {
        const certificateName = certificate.name;
        const certificateFileType = certificate.type.match(/(?<=\/).+/);

        const formData = new FormData();
        formData.append('certificate', certificate, `${certificateName}.${certificateFileType ? certificateFileType[0] : ''}`);
        dispatch(uploadCertificateAction(formData));
      }
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatchFormData();
    setIsTrainingTypesInputUsed(true);
    setIsTrainingLevelInputUsed(true);
    setDescriptionInputUsed(true);
    setImageInputUsed(true);
    if (isFormValid) {
      navigate(AppRoute.PersonalAccountCoach);
    }
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
                        <label className={`${imageInputUsed && certificateError ? 'custom-input--error' : ''}`}>
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
                            {imageInputUsed && certificateError}
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
