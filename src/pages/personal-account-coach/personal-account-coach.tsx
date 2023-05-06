import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import {AVATAR_FILE_TYPES, AVATAR_MAX_SIZE, AppRoute, CERTIFICATE_FILE_TYPES, CoachDescriptionLength, FF_USERS_URL, MAX_CERTIFICATES_COUNT_PER_PAGE, TrainingTypesCount, UserNameLength} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getAvatar,
  getCertificates,
  getDescription,
  getGender,
  getIsReadyToTrain,
  getLocation,
  getTrainingLevel,
  getTrainingTypes,
  getUserName
} from '../../store/user-data/selectors';
import {TrainingType} from '../../types/training-type.enum';
import {nanoid} from 'nanoid';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {SubwayStation} from '../../types/subway-station.enum';
import {Gender} from '../../types/gender.enum';
import {TrainingLevel} from '../../types/training-level.enum';
import {updateUserAction, uploadAvatarAction, uploadCertificateAction} from '../../store/api-actons';
import {setDataLoadedStatus} from '../../store/app-data/app-data';
import {Document, Page, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PersonalAccountCoach(): JSX.Element {
  const dispatch = useAppDispatch();

  const avatarUrl = useAppSelector(getAvatar);
  const userNameInitialValue = useAppSelector(getUserName);
  const descriptionInitialValue = useAppSelector(getDescription);
  const isReadyToTrainInitialValue = useAppSelector(getIsReadyToTrain);
  const trainingTypesInitialValue = useAppSelector(getTrainingTypes);
  const trainingLevelInitialValue = useAppSelector(getTrainingLevel);
  const locationInitialValue = useAppSelector(getLocation);
  const genderInitialValue = useAppSelector(getGender);
  const certificates = useAppSelector(getCertificates);

  const [certificatesPage, setCertificatesPage] = useState(1);

  const [isContentEditable, setIsContentEditable] = useState(false);

  // флаг селекта - открыт/закрыт
  const [isLocationSelectOpened, setIsLocationSelectOpened] = useState(false);
  const [isGenderSelectOpened, setIsGenderSelectOpened] = useState(false);
  const [isTrainingLevelSelectOpened, setIsTrainingLevelSelectOpened] = useState(false);

  // значения полей
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userName, setUserName] = useState(userNameInitialValue);
  const [description, setDescription] = useState(descriptionInitialValue);
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>(trainingTypesInitialValue);
  const [location, setLocation] = useState(locationInitialValue);
  const [gender, setGender] = useState(genderInitialValue);
  const [trainingLevel, setTrainingLevel] = useState(trainingLevelInitialValue);
  const [isReadyToTrain, setIsReadyToTrain] = useState(isReadyToTrainInitialValue);

  // текст ошибки
  const [userNameError, setUserNameError] = useState('');
  const [trainingTypesError, setTrainingTypesError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [avatarError, setAvatarError] = useState('');
  const [certificateError, setCertificateError] = useState('');

  // валидны ли данные формы или нет
  const [isFormValid, setIsFormValid] = useState(false);

  // устанавливаем флаг валидности формы на каждой отрисовке
  useEffect(() => {
    if (trainingTypesError || userNameError || descriptionError || avatarError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [trainingTypesError, userNameError, descriptionError, avatarError]);

  const handleUserNameInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setUserName(value);
    if (value.length < UserNameLength.MIN || value.length > UserNameLength.MAX) {
      setUserNameError(`Длина имени от ${UserNameLength.MIN} до ${UserNameLength.MAX} символов`);
      if (!value) {
        setUserNameError('Заполните поле');
      }
    } else {
      setUserNameError('');
    }
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
  };

  const handleLocationInputClick = (locationValue: SubwayStation) => {
    setLocation(locationValue);
    setIsLocationSelectOpened((prevState) => !prevState);
  };

  const handleGenderInputClick = (genderType: Gender) => {
    setGender(genderType);
    setIsGenderSelectOpened((prevState) => !prevState);
  };

  const handleTrainingLevelInputClick = (level: TrainingLevel) => {
    setTrainingLevel(level);
    setIsTrainingLevelSelectOpened((prevState) => !prevState);
  };

  const handleAvatarFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = AVATAR_FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

    if (matches && file) {
      setAvatarFile(file);

      setAvatarError('');
    } else if (!matches && file) {
      setAvatarError('Загрузите сюда файлы формата PDF, JPG или PNG');
    } else {
      setAvatarError('Добавьте подтверждающий документ');
    }

    if (file?.size && file?.size > AVATAR_MAX_SIZE) {
      setAvatarError(`Максимальный размер файла ${AVATAR_MAX_SIZE * (1e-6)} Мбайт`);
    }
  };

  const dispatchFormData = async () => {
    if (isFormValid && gender && location && trainingLevel) {
      dispatch(setDataLoadedStatus(true));
      await dispatch(updateUserAction({
        userName,
        gender,
        location,
        trainingLevel,
        trainingTypes,
        questionnaire: {
          description,
          isReadyToTrain
        }
      }));

      if (avatarFile) {
        const avatarFileName = avatarFile.name;
        const avatarType = avatarFile.type.match(/(?<=\/).+/);

        const formData = new FormData();
        formData.append('avatar', avatarFile, `${avatarFileName}.${avatarType ? avatarType[0] : ''}`);
        dispatch(uploadAvatarAction(formData));
      }

      dispatch(setDataLoadedStatus(false));
    }
  };

  const handleEditButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsContentEditable(true);
  };

  const handleLeftArrowButtonClick = () => {
    setCertificatesPage((prevState) => prevState > 1 ? prevState - 1 : prevState);
  };

  const handleRightArrowButtonClick = () => {
    const pagesCount = Math.ceil(certificates.length / MAX_CERTIFICATES_COUNT_PER_PAGE);
    setCertificatesPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleCertificateFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = CERTIFICATE_FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

    if (matches && file) {
      dispatch(setDataLoadedStatus(true));

      const certificateName = file.name;
      const certificateFileType = file.type.match(/(?<=\/).+/);

      const formData = new FormData();
      formData.append('certificate', file, `${certificateName}.${certificateFileType ? certificateFileType[0] : ''}`);
      dispatch(uploadCertificateAction(formData));
    } else if (!matches && file) {
      setCertificateError('Только файлы в формате PDF, JPG или PNG');
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatchFormData();
    setIsContentEditable(false);
  };

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <div className={`${isContentEditable ? 'user-info-edit__header' : 'user-info__header'}`}>
                  <div className="input-load-avatar">
                    <label>
                      <input
                        onChange={handleAvatarFileInputChange}
                        className="visually-hidden"
                        type="file" name="user-photo-1"
                        accept="image/png, image/jpeg"
                        disabled={!isContentEditable}
                      />
                      <span className="input-load-avatar__avatar">
                        <img
                          src={`${FF_USERS_URL}/${avatarUrl}`}
                          srcSet={`${FF_USERS_URL}/${avatarUrl} 2x`}
                          width="98" height="98" alt="user"
                        />
                      </span>
                    </label>
                  </div>
                  {
                    isContentEditable
                      && (
                        <div className="user-info-edit__controls">
                          <button className="user-info-edit__control-btn" aria-label="обновить">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-change"></use>
                            </svg>
                          </button>
                          <button className="user-info-edit__control-btn" aria-label="удалить">
                            <svg width="14" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-trash"></use>
                            </svg>
                          </button>
                        </div>
                      )
                  }
                </div>
                <form className={`${isContentEditable ? 'user-info-edit__form' : 'user-info__form'}`} action="#" method="post">
                  {
                    isContentEditable
                      ? (
                        <button
                          onClick={handleSubmitButtonClick}
                          className="btn-flat btn-flat--underlined user-info-edit__save-button"
                          type="submit" aria-label="Сохранить"
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                          </svg>
                          <span>Сохранить</span>
                        </button>
                      )
                      : (
                        <button
                          onClick={handleEditButtonClick}
                          className="btn-flat btn-flat--underlined user-info__edit-button"
                          type="button" aria-label="Редактировать"
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                          </svg>
                          <span>Редактировать</span>
                        </button>
                      )
                  }
                  <div className={`${isContentEditable ? 'user-info-edit__section' : 'user-info__section'}`}>
                    <h2 className="user-info-edit__title">Обо мне</h2>
                    <div
                      className={`
                        custom-input
                        ${isContentEditable ? 'user-info-edit__input' : 'custom-input--readonly user-info__input'}
                        ${userNameError ? 'custom-input--error' : ''}`}
                    >
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input
                            onChange={handleUserNameInputChange}
                            type="text" name="name" value={userName}
                            disabled={!isContentEditable}
                          />
                        </span>
                        <span className="custom-input__error">
                          {userNameError}
                        </span>
                      </label>
                    </div>
                    <div
                      className={`
                        custom-textarea
                        ${isContentEditable ? 'user-info-edit__textarea' : 'custom-textarea--readonly user-info__textarea'}
                      `}
                    >
                      <label className={`${descriptionError ? 'custom-input--error' : ''}`}>
                        <span className="custom-textarea__label">Описание</span>
                        <textarea
                          onChange={handleDescriptionInputChange}
                          name="description" placeholder=" "
                          value={description}
                          disabled={!isContentEditable}
                        >
                        </textarea>
                        <span className="custom-input__error">
                          {descriptionError}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div
                    className={`
                      ${isContentEditable ? 'user-info-edit__section user-info-edit__section--status' : 'user-info__section user-info__section--status'}
                    `}
                  >
                    <h2
                      className={`
                        ${isContentEditable ? 'user-info-edit__title user-info-edit__title--status' : 'user-info__title user-info__title--status'}
                      `}
                    >
                      Статус
                    </h2>
                    <div
                      className={`
                        custom-toggle
                        custom-toggle--switch
                        ${isContentEditable ? 'user-info-edit__toggle' : 'user-info__toggle'}
                      `}
                    >
                      <label>
                        <input
                          onChange={() => setIsReadyToTrain((prevState) => !prevState)}
                          type="checkbox" name="ready-for-training" checked={isReadyToTrain}
                        />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">
                          {isReadyToTrain ? 'Готов тренировать' : 'Не готов тренировать'}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div
                    className={`
                      ${isContentEditable ? 'user-info-edit__section' : 'user-info__section'}
                    `}
                  >
                    <h2
                      className={`
                        ${isContentEditable ? 'user-info-edit__title user-info-edit__title--specialization' : 'user-info__title user-info__title--specialization'}
                      `}
                    >
                      Специализация
                    </h2>
                    <div
                      className={`
                        specialization-checkbox
                        ${isContentEditable ? 'user-info-edit__specialization' : 'user-info__specialization'}
                        ${trainingTypesError ? 'custom-input--error' : ''}
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
                        {trainingTypesError}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`
                      custom-select
                      ${isContentEditable ? 'user-info-edit__select' : 'custom-select--readonly user-info__select'}
                      ${isLocationSelectOpened ? 'is-open' : ''}
                    `}
                  >
                    <span className="custom-select__label">Локация</span>
                    <div className="custom-select__placeholder">
                      {`ст. м. ${location ?? ''}`}
                    </div>
                    <button
                      onClick={() => setIsLocationSelectOpened((prevState) => !prevState)}
                      className="custom-select__button" type="button" aria-label="Выберите одну из опций"
                      disabled={!isContentEditable}
                    >
                      <span className="custom-select__text"></span>
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
                  </div>
                  <div
                    className={`
                      custom-select
                      ${isContentEditable ? 'user-info-edit__select' : 'custom-select--readonly user-info__select'}
                      ${isGenderSelectOpened ? 'is-open' : ''}
                    `}
                  >
                    <span className="custom-select__label">Пол</span>
                    <div className="custom-select__placeholder">
                      {gender?.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                    </div>
                    <button
                      onClick={() => setIsGenderSelectOpened((prevState) => !prevState)}
                      className="custom-select__button" type="button" aria-label="Выберите одну из опций"
                      disabled={!isContentEditable}
                    >
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                      {
                        Object.values(Gender).map((genderType) => (
                          <li
                            onClick={() => handleGenderInputClick(genderType)}
                            key={nanoid()}
                            className="custom-select__item"
                          >
                            {genderType.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div
                    className={`
                      custom-select
                      ${isContentEditable ? 'user-info-edit__select' : 'custom-select--readonly user-info__select'}
                      ${isTrainingLevelSelectOpened ? 'is-open' : ''}
                    `}
                  >
                    <span className="custom-select__label">Уровень</span>
                    <div className="custom-select__placeholder">
                      {trainingLevel?.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                    </div>
                    <button
                      onClick={() => setIsTrainingLevelSelectOpened((prevState) => !prevState)}
                      className="custom-select__button" type="button" aria-label="Выберите одну из опций"
                      disabled={!isContentEditable}
                    >
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                      {
                        Object.values(TrainingLevel).map((level) => (
                          <li
                            onClick={() => handleTrainingLevelInputClick(level)}
                            key={nanoid()}
                            className="custom-select__item"
                          >
                            {level.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyTrainings}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-flash"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои тренировки</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.CreateTraining}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Создать тренировку</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.FriendsList}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoute.MyOrders}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <div className="personal-account-coach__calendar"></div>
                  </div>
                  <div className="personal-account-coach__additional-info">
                    <div className="personal-account-coach__label-wrapper">
                      <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
                      <label
                        className={`
                          btn-flat btn-flat--underlined
                          personal-account-coach__button
                          ${certificateError ? 'custom-input--error' : ''}
                        `}
                      >
                        <span>
                          <svg width="14" height="14" aria-hidden="true">
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                          {' '}
                          Загрузить
                        </span>
                        <input
                          onChange={handleCertificateFileInputChange}
                          className="visually-hidden" type="file" name="import" tabIndex={-1} accept=".pdf, .jpg, .png"
                        />
                        <span style={{marginTop: '0'}} className="custom-input__error">
                          {certificateError}
                        </span>
                      </label>
                      <div className="personal-account-coach__controls">
                        <button
                          onClick={handleLeftArrowButtonClick}
                          className="btn-icon personal-account-coach__control"
                          type="button" aria-label="previous"
                        >
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-left"></use>
                          </svg>
                        </button>
                        <button
                          onClick={handleRightArrowButtonClick}
                          className="btn-icon personal-account-coach__control"
                          type="button" aria-label="next"
                        >
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-right"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <ul className="personal-account-coach__list">
                      {
                        certificates.slice((certificatesPage - 1) * MAX_CERTIFICATES_COUNT_PER_PAGE, ((certificatesPage - 1) * MAX_CERTIFICATES_COUNT_PER_PAGE) + MAX_CERTIFICATES_COUNT_PER_PAGE).map((certificateItem) => (
                          <li key={nanoid()} className="personal-account-coach__item">
                            <div className="certificate-card certificate-card--edit">
                              <div className="certificate-card__image">
                                <picture>
                                  {
                                    certificateItem.match(/.+.pdf/)
                                      ? (
                                        <Document file={`${FF_USERS_URL}/${certificateItem}`}>
                                          <Page renderAnnotationLayer={false} height={360} pageNumber={1} renderTextLayer={false}/>
                                        </Document>
                                      )
                                      : (
                                        <>
                                          <source type="image/webp" srcSet={`${FF_USERS_URL}/${certificateItem}`}/>
                                          <img src={`${FF_USERS_URL}/${certificateItem}`} srcSet={`${FF_USERS_URL}/${certificateItem} 2x`} width="294" height="360" alt="Сертификат - Биомеханика ударов в боксе"/>
                                        </>
                                      )
                                  }
                                </picture>
                              </div>
                              <div className="certificate-card__buttons">
                                <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                                  <svg width="12" height="12" aria-hidden="true">
                                    <use xlinkHref="#icon-edit"></use>
                                  </svg>
                                  <span>Изменить</span>
                                </button>
                                <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                                  <svg width="12" height="12" aria-hidden="true">
                                    <use xlinkHref="#icon-edit"></use>
                                  </svg>
                                  <span>Сохранить</span>
                                </button>
                                <div className="certificate-card__controls">
                                  <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                    <svg width="16" height="16" aria-hidden="true">
                                      <use xlinkHref="#icon-change"></use>
                                    </svg>
                                  </button>
                                  <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                    <svg width="14" height="16" aria-hidden="true">
                                      <use xlinkHref="#icon-trash"></use>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                      {/*
                      <li className="personal-account-coach__item">
                        <div className="certificate-card certificate-card--edit">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-1.webp, img/content/certificates-and-diplomas/certificate-1@2x.webp 2x"/>
                              <img src="img/content/certificates-and-diplomas/certificate-1.jpg" srcSet="img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x" width="294" height="360" alt="Сертификат - Биомеханика ударов в боксе"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-2.webp, img/content/certificates-and-diplomas/certificate-2@2x.webp 2x"/>
                              <img src="img/content/certificates-and-diplomas/certificate-2.jpg" srcSet="img/content/certificates-and-diplomas/certificate-2@2x.jpg 2x" width="294" height="360" alt="Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-3.webp, img/content/certificates-and-diplomas/certificate-3@2x.webp 2x"/>
                              <img src="img/content/certificates-and-diplomas/certificate-3.jpg" srcSet="img/content/certificates-and-diplomas/certificate-3@2x.jpg 2x" width="294" height="360" alt="Сертифиционный курс по кроссфиту 2-го уровня"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-4.webp, img/content/certificates-and-diplomas/certificate-4@2x.webp 2x"/>
                              <img src="img/content/certificates-and-diplomas/certificate-4.jpg" srcSet="img/content/certificates-and-diplomas/certificate-4@2x.jpg 2x" width="294" height="360" alt="Сертификат инструкторов йоги"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-5.webp, img/content/certificates-and-diplomas/certificate-5@2x.webp 2x"/>
                              <img src="img/content/certificates-and-diplomas/certificate-5.jpg" srcSet="img/content/certificates-and-diplomas/certificate-5@2x.jpg 2x" width="294" height="360" alt="Сертификат фитне аэробики"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="img/content/certificates-and-diplomas/certificate-6.webp, img/content/certificates-and-diplomas/certificate-6@2x.webp 2x"/>
                              <img src="img/content/certificates-and-diplomas/certificate-6.jpg" srcSet="img/content/certificates-and-diplomas/certificate-6@2x.jpg 2x" width="294" height="360" alt="Сертификат фитне аэробики"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PersonalAccountCoach;
