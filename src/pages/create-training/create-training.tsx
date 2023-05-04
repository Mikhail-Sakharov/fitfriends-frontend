import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import Header from '../../components/header/header';
import {TrainingLevel} from '../../types/training-level.enum';
import {TrainingType} from '../../types/training-type.enum';
import {Duration} from '../../types/duration.enum';
import {nanoid} from 'nanoid';
import {AppRoute, TrainingCaloriesCount, TrainingDescriptionLength, TrainingPrice, TrainingTitleLength, VIDEO_FILE_TYPES} from '../../const';
import {TrainingGenderType} from '../../types/training-gender.enum';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useNavigate} from 'react-router-dom';
import {setDataLoadedStatus} from '../../store/app-data/app-data';
import {createTrainingAction, uploadVideoFileAction} from '../../store/api-actons';
import {getCreatedTrainingId} from '../../store/app-data/selectors';

function CreateTraining(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createdTrainingId = useAppSelector(getCreatedTrainingId);

  // флаг селекта - открыт/закрыт
  const [isTrainingTypeSelectOpened, setIsTrainingTypeSelectOpened] = useState(false);
  const [isTrainingLevelSelectOpened, setIsTrainingLevelSelectOpened] = useState(false);
  const [isDurationSelectOpened, setIsDurationSelectOpened] = useState(false);

  // значения полей
  const [title, setTitle] = useState('');
  // const [bgImageUrl, setBgImageUrl] = useState();
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel | null>(null);
  const [trainingType, setTrainingType] = useState<TrainingType | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [caloriesCount, setCaloriesCount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState<TrainingGenderType | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  // const [isSpecialOffer, setIsSpecialOffer] = useState();

  // был ли инпут в фокусе
  const [titleInputUsed, setTitleInputUsed] = useState(false);
  const [trainingLevelInputUsed, setTrainingLevelInputUsed] = useState(false);
  const [trainingTypeInputUsed, setTrainingTypeInputUsed] = useState(false);
  const [durationInputUsed, setDurationInputUsed] = useState(false);
  const [caloriesCountInputUsed, setCaloriesCountInputUsed] = useState(false);
  const [priceInputUsed, setPriceInputUsed] = useState(false);
  const [genderInputUsed, setGenderInputUsed] = useState(false);
  const [descriptionInputUsed, setDescriptionInputUsed] = useState(false);
  const [videoFileInputUsed, setVideoFileInputUsed] = useState(false);

  // текст ошибки
  const [titleError, setTitleTypeError] = useState('Укажите название тренировки');
  const [trainingLevelError, setTrainingLevelError] = useState('Выберите уровень подготовки');
  const [trainingTypeError, setTrainingTypeError] = useState('Выберите тип тренировки');
  const [durationError, setDurationError] = useState('Выберите продолжительность тренировки');
  const [caloriesCountError, setCaloriesCountError] = useState('Укажите количество калорий');
  const [priceError, setPriceError] = useState('Укажите цену');
  const [genderError, setGenderError] = useState('Выберите пол');
  const [descriptionError, setDescriptionError] = useState('Опишите тренировку');
  const [videoFileError, setVideoFileError] = useState('Загрузите видео');

  // валидны ли данные формы или нет
  const [formValid, setFormValid] = useState(true);

  // устанавливаем флаг валидности формы на каждой отрисовке
  useEffect(() => {
    if ([
      trainingTypeError,
      titleError,
      durationError,
      caloriesCountError,
      priceError,
      genderError,
      trainingLevelError,
      descriptionError,
      videoFileError
    ].some((item) => !!item)) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    trainingTypeError,
    titleError,
    durationError,
    caloriesCountError,
    priceError,
    genderError,
    trainingLevelError,
    descriptionError,
    videoFileError
  ]);

  const handleTitleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
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

  const handleInputFocus = (evt: FormEvent<HTMLInputElement>) => {
    switch(evt.currentTarget.name) {
      case 'training-name':
        setTitleInputUsed(true);
        break;
      case 'calories':
        setCaloriesCountInputUsed(true);
        break;
      case 'price':
        setPriceInputUsed(true);
        break;
    }
  };

  const handleTrainingLevelInputFocus = () => {
    setTrainingLevelInputUsed(true);
  };

  const handleTrainingTypeInputFocus = () => {
    setTrainingTypeInputUsed(true);
  };

  const handleDurationInputFocus = () => {
    setDurationInputUsed(true);
  };

  const handleDescriptionInputFocus = () => {
    setDescriptionInputUsed(true);
  };

  const handleTrainingLevelInputClick = (level: TrainingLevel) => {
    setTrainingLevel(level);
    setIsTrainingLevelSelectOpened((prevState) => !prevState);
    if (!level) {
      setTrainingLevelError('Выберите уровень подготовки');
    } else {
      setTrainingLevelError('');
    }
  };

  const handleTrainingTypeInputClick = (type: TrainingType) => {
    setTrainingType(type);
    setIsTrainingTypeSelectOpened((prevState) => !prevState);
    if (!type) {
      setTrainingTypeError('Выберите тип тренировки');
    } else {
      setTrainingTypeError('');
    }
  };

  const handleDurationInputClick = (durationValue: Duration) => {
    setDuration(durationValue);
    setIsDurationSelectOpened((prevState) => !prevState);
    if (!durationValue) {
      setDurationError('Выберите продолжительность тренировки');
    } else {
      setDurationError('');
    }
  };

  const handleCaloriesCountInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
    setCaloriesCount(value);
    if (value < TrainingCaloriesCount.MIN || value > TrainingCaloriesCount.MAX) {
      setCaloriesCountError(`Количество калорий от ${TrainingCaloriesCount.MIN} до ${TrainingCaloriesCount.MAX}`);
      if (!value) {
        setCaloriesCountError('Укажите количество калорий');
      }
    } else {
      setCaloriesCountError('');
    }
  };

  const handlePriceInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
    setPrice(value);
    if (value < TrainingPrice.MIN || value > TrainingPrice.MAX) {
      setPriceError(`Цена от ${TrainingPrice.MIN} до ${TrainingPrice.MAX}`);
      if (!value) {
        setPriceError('Укажите цену');
      }
    } else {
      setPriceError('');
    }
  };

  const handleGenderInputChange = (genderInputValue: TrainingGenderType) => {
    setGender(genderInputValue);
    if (!genderInputValue) {
      setGenderError('Выберите пол');
    } else {
      setGenderError('');
    }
  };

  const handleDescriptionInputChange = (evt: FormEvent<HTMLTextAreaElement>) => {
    const value = evt.currentTarget.value;
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

  const dispatchFormData = async () => {
    if (formValid && trainingLevel && trainingType && duration && gender) {
      dispatch(setDataLoadedStatus(true));
      await dispatch(createTrainingAction({
        title,
        bgImageUrl: 'img/content/thumbnails/training-01.jpg', // рандомная картинка
        level: trainingLevel,
        type: trainingType,
        duration,
        price,
        caloriesCount,
        description,
        gender,
        videoUrl: 'osidyfoigusydfoigu', // добавить дефолтное значение на сервере
        isSpecialOffer: false // добавить дефолтное значение на сервере
      }));

      /* if (videoFile && createdTrainingId) {
        const videoFileName = videoFile.name;
        const videoFileType = videoFile.type.match(/(?<=\/).+/);

        const formData = new FormData();
        formData.append('video', videoFile, `${videoFileName}.${videoFileType ? videoFileType[0] : ''}`);
        dispatch(uploadVideoFileAction({formData, createdTrainingId}));
      } */
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatchFormData();
    setTrainingTypeInputUsed(true);
    setTitleInputUsed(true);
    setDurationInputUsed(true);
    setCaloriesCountInputUsed(true);
    setPriceInputUsed(true);
    setGenderInputUsed(true);
    setTrainingLevelInputUsed(true);
    setDescriptionInputUsed(true);
    setVideoFileInputUsed(true);
    if (createdTrainingId) {
      navigate(AppRoute.MyTrainings);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form method="get">
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Название тренировки</h2>
                        <div
                          className={`
                            custom-input create-training__input
                            ${titleInputUsed && titleError ? 'custom-input--error' : ''}
                          `}
                        >
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                onFocus={handleInputFocus}
                                onChange={handleTitleInputChange}
                                type="text" name="training-name" value={title}
                              />
                            </span>
                            <span className="custom-input__error">
                              {titleInputUsed && titleError}
                            </span>
                          </label>
                        </div>
                        <div
                          className={`
                              custom-select
                              ${isTrainingLevelSelectOpened ? 'is-open' : ''}
                              ${trainingLevel ? 'not-empty' : 'custom-select--not-selected'}
                              ${trainingLevelInputUsed && trainingLevelError ? 'is-invalid' : ''}
                            `}
                        >
                          <span className="custom-select__label">Выберите уровень подготовки</span>
                          <button
                            onFocus={handleTrainingLevelInputFocus}
                            onClick={() => setIsTrainingLevelSelectOpened((prevState) => !prevState)}
                            className="custom-select__button" type="button" aria-label="Выберите одну из опций"
                          >
                            <span className="custom-select__text">
                              {trainingLevel?.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                            </span>
                            <span className="custom-select__icon">
                              <svg width="15" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-down"></use>
                              </svg>
                            </span>
                          </button>
                          <ul className="custom-select__list" role="listbox">
                            {
                              Object.values(TrainingLevel).map((option) => (
                                <li
                                  onClick={() => handleTrainingLevelInputClick(option)}
                                  key={nanoid()}
                                  className="custom-select__item"
                                >
                                  {option.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                                </li>
                              ))
                            }
                          </ul>
                          <span className="custom-select__error">
                            {trainingLevelInputUsed && trainingLevelError}
                          </span>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Характеристики тренировки</h2>
                        <div className="create-training__info">
                          <div
                            className={`
                              custom-select
                              ${isTrainingTypeSelectOpened ? 'is-open' : ''}
                              ${trainingType ? 'not-empty' : 'custom-select--not-selected'}
                              ${trainingTypeInputUsed && trainingTypeError ? 'is-invalid' : ''}
                            `}
                          >
                            <span className="custom-select__label">Выберите тип тренировки</span>
                            <button
                              onFocus={handleTrainingTypeInputFocus}
                              onClick={() => setIsTrainingTypeSelectOpened((prevState) => !prevState)}
                              className="custom-select__button" type="button" aria-label="Выберите одну из опций"
                            >
                              <span className="custom-select__text">
                                {trainingType?.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                              </span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {
                                Object.values(TrainingType).map((option) => (
                                  <li
                                    onClick={() => handleTrainingTypeInputClick(option)}
                                    key={nanoid()}
                                    className="custom-select__item"
                                  >
                                    {option.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                                  </li>
                                ))
                              }
                            </ul>
                            <span className="custom-select__error">
                              {trainingTypeInputUsed && trainingTypeError}
                            </span>
                          </div>
                          <div
                            className={`
                              custom-input custom-input--with-text-right
                              ${caloriesCountInputUsed && caloriesCountError ? 'custom-input--error' : ''}
                            `}
                          >
                            <label>
                              <span className="custom-input__label">Сколько калорий потратим</span>
                              <span className="custom-input__wrapper">
                                <input
                                  onFocus={handleInputFocus}
                                  onChange={handleCaloriesCountInputChange}
                                  type="number" name="calories"
                                  value={caloriesCount.toString()}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                              <span className="custom-input__error">
                                {caloriesCountInputUsed && caloriesCountError}
                              </span>
                            </label>
                          </div>
                          <div
                            className={`
                              custom-select
                              ${isDurationSelectOpened ? 'is-open' : ''}
                              ${duration ? 'not-empty' : 'custom-select--not-selected'}
                              ${durationInputUsed && durationError ? 'is-invalid' : ''}
                            `}
                          >
                            <span className="custom-select__label">Сколько времени потратим</span>
                            <button
                              onFocus={handleDurationInputFocus}
                              onClick={() => setIsDurationSelectOpened((prevState) => !prevState)}
                              className="custom-select__button" type="button" aria-label="Выберите одну из опций"
                            >
                              <span className="custom-select__text">
                                {duration}
                              </span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {
                                Object.values(Duration).map((option) => (
                                  <li
                                    onClick={() => handleDurationInputClick(option)}
                                    key={nanoid()}
                                    className="custom-select__item"
                                  >
                                    {option}
                                  </li>
                                ))
                              }
                            </ul>
                            <span className="custom-select__error">
                              {durationInputUsed && durationError}
                            </span>
                          </div>
                          <div
                            className={`
                              custom-input custom-input--with-text-right
                              ${priceInputUsed && priceError ? 'custom-input--error' : ''}
                            `}
                          >
                            <label>
                              <span className="custom-input__label">Стоимость тренировки</span>
                              <span className="custom-input__wrapper">
                                <input
                                  onFocus={handleInputFocus}
                                  onChange={handlePriceInputChange}
                                  type="number" name="price"
                                  value={price.toString()}
                                />
                                <span className="custom-input__text">₽</span>
                              </span>
                              <span className="custom-input__error">
                                {priceInputUsed && priceError}
                              </span>
                            </label>
                          </div>
                        </div>
                        <div
                          className={`
                            create-training__radio-wrapper
                            ${genderInputUsed && genderError ? 'custom-input--error' : ''}
                          `}
                        >
                          <span className="create-training__label">Кому подойдет тренировка</span>
                          <div className="custom-toggle-radio create-training__radio">
                            {
                              Object.values(TrainingGenderType).map((option) => (
                                <div key={nanoid()} className="custom-toggle-radio__block">
                                  <label>
                                    <input
                                      onChange={() => handleGenderInputChange(option)}
                                      type="radio" name="gender"
                                      checked={option === gender}
                                    />
                                    <span className="custom-toggle-radio__icon"></span>
                                    <span className="custom-toggle-radio__label">
                                      {option.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                                    </span>
                                  </label>
                                </div>
                              ))
                            }
                          </div>
                          <span className="custom-input__error">
                            {genderInputUsed && genderError}
                          </span>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Описание тренировки</h2>
                        <div className="custom-textarea create-training__textarea">
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
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label className={`${videoFileInputUsed && videoFileError ? 'custom-input--error' : ''}`}>
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
                              {videoFileInputUsed && videoFileError}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmitButtonClick}
                      className="btn create-training__button" type="submit"
                    >
                      Опубликовать
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default CreateTraining;
