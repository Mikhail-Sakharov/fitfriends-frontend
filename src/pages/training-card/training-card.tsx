import Header from '../../components/header/header';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {FF_SERVICE_URL, FF_USERS_URL, TrainingDescriptionLength, TrainingPrice, TrainingTitleLength, VIDEO_FILE_TYPES} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {UserRole} from '../../types/user-role.enum';
import {nanoid} from 'nanoid';
import {getCurrentTraining, getUserInfo} from '../../store/training-data/selectors';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {getTrainingId} from '../../helpers';
import {fetchTrainingInfoAction, fetchUserInfoAction, updateTrainingAction, uploadVideoFileAction} from '../../store/api-actions';
import {setDataLoadedStatus} from '../../store/app-data/app-data';
import PopupBuyTraining from '../../components/popup-buy-training/popup-buy-training';

type TrainingCardProps = {
  userRole: UserRole;
};

function TrainingCard({userRole}: TrainingCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const training = useAppSelector(getCurrentTraining);
  const trainingAuthor = useAppSelector(getUserInfo);
  const avatar = trainingAuthor?.avatarUrl;
  const userName = trainingAuthor?.userName;

  const features = [
    `#${training ? training.type : ''}`,
    `#${training ? training.gender : ''}`,
    `#${training ? training.caloriesCount : ''}ккал`,
    `#${training ? training.duration : ''}`
  ];

  const [isBuyTrainingModalOpened, setIsBuyTrainingModalOpened] = useState(false);

  const [isContentEditable, setIsContentEditable] = useState(false);

  const [isCurrentVideoMarkedForDeleting, setIsCurrentVideoMarkedForDeleting] = useState(false);

  const priceInputRef = useRef<HTMLInputElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const playButtonRef = useRef<HTMLButtonElement | null>(null);

  // значения полей
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isSpecialOffer, setIsSpecialOffer] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // текст ошибки
  const [titleError, setTitleTypeError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [videoFileError, setVideoFileError] = useState('');

  // валидны ли данные формы или нет
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    // если страница перезагружалась, заново запрашиваем данные о тренировке
    if (!training) {
      dispatch(fetchTrainingInfoAction(getTrainingId()));
    } else if (!avatar || !userName) {
      dispatch(fetchUserInfoAction(training.coachId));
    }
    if (titleError || descriptionError || priceError || videoFileError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [avatar, descriptionError, dispatch, priceError, titleError, training, userName, videoFileError]);

  const handleTitleInputChange = () => {
    const value = titleInputRef.current ? titleInputRef.current.value : '';
    setTitle(value);
    if (value.length < TrainingTitleLength.MIN || value.length > TrainingTitleLength.MAX) {
      setTitleTypeError(`Длина названия от ${TrainingTitleLength.MIN} до ${TrainingTitleLength.MAX} символов`);
      if (!value) {
        setTitleTypeError('Укажите название тренировки');
      }
    } else {
      setTitleTypeError('');
    }
  };

  const handleDescriptionInputChange = () => {
    const value = descriptionInputRef.current ? descriptionInputRef.current.value : '';
    setDescription(value);
    setDescription(value);
    if (value.length < TrainingDescriptionLength.MIN || value.length > TrainingDescriptionLength.MAX) {
      setDescriptionError(`Длина описания от ${TrainingDescriptionLength.MIN} до ${TrainingDescriptionLength.MAX} символов`);
      if (!value) {
        setDescriptionError('Опишите тренировку');
      }
    } else {
      setDescriptionError('');
    }
  };

  const handlePriceInputChange = () => {
    const value = priceInputRef.current ? priceInputRef.current.value : '';
    setPrice(value);
    if (Number(value) < TrainingPrice.MIN || Number(value) > TrainingPrice.MAX) {
      setPriceError(`Цена от ${TrainingPrice.MIN} до ${TrainingPrice.MAX}`);
      if (!value) {
        setPriceError('Укажите цену');
      }
    } else {
      setPriceError('');
    }
  };

  const handleEditButtonClick = () => {
    if (!title && titleInputRef.current) {
      setTitle(training ? training.title : '');
      titleInputRef.current.value = training ? training.title : '';
    }
    if (!description && descriptionInputRef.current) {
      setDescription(training ? training.description : '');
      descriptionInputRef.current.value = training ? training.description : '';
    }
    if (!price && priceInputRef.current) {
      setPrice(training ? String(training.price) : '');
      priceInputRef.current.value = training ? String(training.price) : '';
    }
    setIsContentEditable(true);
  };

  const handlePlayButtonClick = () => {
    if (videoElementRef.current) {
      videoElementRef.current.play();
      videoElementRef.current.controls = true;
    }
    if (playButtonRef.current) {
      playButtonRef.current.style.display = 'none';
    }
  };

  const handlePauseControlClick = () => {
    if (videoElementRef.current) {
      videoElementRef.current.pause();
      videoElementRef.current.controls = false;
    }
    if (playButtonRef.current) {
      playButtonRef.current.style.display = 'flex';
    }
  };

  const handleDeleteVideoButtonClick = () => {
    setIsCurrentVideoMarkedForDeleting(true);
    setVideoFileError('Загрузите видео');
  };

  const handleVideoFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = VIDEO_FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

    if (matches && file) {
      setVideoFile(file);

      setVideoFileError('');
    } else if (!matches && file) {
      setVideoFileError('Загрузите сюда файлы формата PDF, JPG или PNG');
    } else {
      setVideoFileError('Добавьте подтверждающий документ');
    }
  };

  const dispatchVideoFile = async () => {
    if (videoFile) {
      dispatch(setDataLoadedStatus(true));

      const formData = new FormData();

      const videoFileName = videoFile.name;
      const videoFileType = videoFile.type.match(/(?<=\/).+/);

      formData.append('video', videoFile, `${videoFileName}.${videoFileType ? videoFileType[0] : ''}`);

      await dispatch(uploadVideoFileAction({
        videoFileFormData: formData,
        createdTrainingId: getTrainingId()
      }));

      dispatch(setDataLoadedStatus(false));
    }
  };

  const handleSaveVideoButtonClick = () => {
    dispatchVideoFile();
  };

  const dispatchFormData = async () => {
    if (formValid) {
      await dispatch(updateTrainingAction({
        trainingId: getTrainingId(),
        updateTrainingDto: {
          title,
          description,
          price: Number(price),
          isSpecialOffer
        }
      }));
    }
  };

  const handleSaveButtonClick = () => {
    dispatchFormData();
    setIsContentEditable(false);
  };

  const handleBuyButtonClick = () => {
    setIsBuyTrainingModalOpened(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewsList training={training}/>
              <div className={`training-card ${userRole === UserRole.Coach ? 'training-card--edit' : ''}`}>
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <img src={avatar ? `${FF_USERS_URL}/${avatar}` : ''} width="64" height="64" alt="Изображение тренера"/>
                        </picture>
                      </div>
                      <div className="training-info__coach-info">
                        <span className="training-info__label">Тренер</span>
                        <span className="training-info__name">
                          {userName}
                        </span>
                      </div>
                    </div>
                    {
                      (userRole === UserRole.Coach && isContentEditable)
                        && (
                          <button
                            onClick={handleSaveButtonClick}
                            className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save" type="button"
                            disabled={!formValid}
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Сохранить</span>
                          </button>
                        )
                    }
                    {
                      (userRole === UserRole.Coach && !isContentEditable)
                        && (
                          <button
                            onClick={handleEditButtonClick}
                            className="btn-flat btn-flat--light training-info__edit" type="button"
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Редактировать</span>
                          </button>
                        )
                    }
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div
                            className={`
                              training-info__input
                              ${titleError ? 'is-invalid' : ''}
                              training-info__input--training
                            `}
                          >
                            <label>
                              <span className="training-info__label">Название тренировки</span>
                              <input
                                ref={titleInputRef}
                                defaultValue={training?.title}
                                onChange={handleTitleInputChange}
                                type="text" name="training"
                                disabled={!isContentEditable}
                              />
                            </label>
                            <div className="training-info__error">
                              {titleError}
                            </div>
                          </div>
                          <div
                            className={`
                              training-info__textarea
                              ${descriptionError ? 'training-info__input is-invalid' : ''}
                            `}
                          >
                            <label>
                              <span className="training-info__label">Описание тренировки</span>
                              <textarea
                                ref={descriptionInputRef}
                                defaultValue={training?.description}
                                onChange={handleDescriptionInputChange}
                                name="description"
                                disabled={!isContentEditable}
                              >
                              </textarea>
                            </label>
                            <div className="training-info__error">
                              {descriptionError}
                            </div>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label>
                              <span className="training-info__label">Рейтинг</span>
                              <span className="training-info__rating-icon">
                                <svg width="18" height="18" aria-hidden="true">
                                  <use xlinkHref="#icon-star"></use>
                                </svg>
                              </span>
                              <input type="number" name="rating" value={training?.rating} disabled/>
                            </label>
                          </div>
                          <ul className="training-info__list">
                            {
                              features.map((feature) => (
                                <li key={nanoid()} className="training-info__item">
                                  <div className="hashtag hashtag--white">
                                    <span>
                                      {feature}
                                    </span>
                                  </div>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div
                            className={`
                              training-info__input
                              ${priceError ? 'is-invalid' : ''}
                              training-info__input--price
                            `}
                          >
                            <label>
                              <span className="training-info__label">Стоимость, ₽</span>
                              <input
                                ref={priceInputRef}
                                defaultValue={training ? String(training.price) : ''}
                                onChange={handlePriceInputChange}
                                type="number" name="price"
                                disabled={!isContentEditable}
                              />
                            </label>
                            <div className="training-info__error">
                              {priceError}
                            </div>
                          </div>
                          {
                            userRole === UserRole.Coach
                              && (
                                <button
                                  onClick={() => setIsSpecialOffer(true)}
                                  className="btn-flat btn-flat--light btn-flat--underlined training-info__discount" type="button"
                                  disabled={!isContentEditable || isSpecialOffer}
                                >
                                  <svg width="14" height="14" aria-hidden="true">
                                    <use xlinkHref="#icon-discount"></use>
                                  </svg>
                                  <span>Сделать скидку 10%</span>
                                </button>
                              )
                          }
                          {
                            userRole === UserRole.User
                              && (
                                <button
                                  onClick={handleBuyButtonClick}
                                  className="btn training-info__buy" type="button"
                                >
                                  Купить
                                </button>
                              )
                          }
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className={`
                    training-video
                    ${isCurrentVideoMarkedForDeleting ? 'training-video--load' : ''}
                    ${training?.videoUrl === '' || training?.bgImageUrl === '' ? 'training-video--load' : ''}
                  `}
                >
                  <h2 className="training-video__title">Видео</h2>
                  {
                    training?.videoUrl !== '' && !isCurrentVideoMarkedForDeleting
                      ? (
                        <div className="training-video__video">
                          <div className="training-video__thumbnail">
                            {
                              training
                                && (
                                  <video
                                    onPause={handlePauseControlClick}
                                    ref={videoElementRef}
                                    src={`${FF_SERVICE_URL}/${training.videoUrl}`}
                                  >
                                  </video>
                                )
                            }
                          </div>
                          <button ref={playButtonRef} onClick={handlePlayButtonClick} className="training-video__play-button btn-reset">
                            <svg width="18" height="30" aria-hidden="true">
                              <use xlinkHref="#icon-arrow"></use>
                            </svg>
                          </button>
                        </div>
                      )
                      : (
                        <div className="training-video__drop-files">
                          <form action="#" method="post">
                            <div className="training-video__form-wrapper">
                              <div className="drag-and-drop">
                                <label className={`${videoFileError ? 'custom-input--error' : ''}`}>
                                  <span className="drag-and-drop__label" tabIndex={0}>
                                    Загрузите сюда файлы формата MOV, AVI или MP4
                                    <svg width="20" height="20" aria-hidden="true">
                                      <use xlinkHref="#icon-import-video"></use>
                                    </svg>
                                  </span>
                                  <input
                                    onChange={handleVideoFileInputChange}
                                    type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4"
                                  />
                                  <span className="custom-input__error">
                                    {videoFileError}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </form>
                        </div>
                      )
                  }
                  <div className="training-video__buttons-wrapper">
                    <button className="btn training-video__button training-video__button--start" type="button" disabled={userRole === UserRole.Coach}>Приступить</button>
                    {
                      userRole === UserRole.Coach && isContentEditable
                        ? (
                          <div className="training-video__edit-buttons">
                            <button
                              onClick={handleSaveVideoButtonClick}
                              className="btn" type="button"
                              disabled={!videoFile}
                            >
                              Сохранить
                            </button>
                            <button
                              onClick={handleDeleteVideoButtonClick}
                              className="btn btn--outlined" type="button"
                              disabled={isCurrentVideoMarkedForDeleting}
                            >
                              Удалить
                            </button>
                          </div>
                        )
                        : (
                          <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
                        )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {
        (isBuyTrainingModalOpened && training)
          && (
            <PopupBuyTraining
              training={training}
              setModalOpened={setIsBuyTrainingModalOpened}
            />
          )
      }
    </>
  );
}

export default TrainingCard;
