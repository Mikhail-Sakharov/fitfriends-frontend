import Header from '../../components/header/header';
import ReviewsList from '../../components/reviews-list/reviews-list';
import {FF_USERS_URL} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {UserRole} from '../../types/user-role.enum';
import {nanoid} from 'nanoid';
import {getCurrentTraining, getUserInfo} from '../../store/training-data/selectors';
import {useEffect, useRef, useState} from 'react';
import {getTrainingId} from '../../helpers';
import {fetchTrainingInfoAction, fetchUserInfoAction} from '../../store/api-actions';

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

  const [isContentEditable, setIsContentEditable] = useState(false);

  const priceInputRef = useRef<HTMLInputElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement | null>(null);

  // значения полей
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isSpecialOffer, setIsSpecialOffer] = useState(false);

  useEffect(() => {
    if (!training) {
      dispatch(fetchTrainingInfoAction(getTrainingId()));
    } else if (!avatar || !userName) {
      dispatch(fetchUserInfoAction(training.coachId));
    }
  }, [avatar, dispatch, training, userName]);

  const handleTitleInputChange = () => {
    setTitle(titleInputRef.current ? titleInputRef.current.value : '');
  };

  const handleDescriptionInputChange = () => {
    setDescription(descriptionInputRef.current ? descriptionInputRef.current.value : '');
  };

  const handlePriceInputChange = () => {
    setPrice(priceInputRef.current ? priceInputRef.current.value : '');
  };

  const handleEditButtonClick = () => {
    setTitle(training ? training.title : '');
    setDescription(training ? training.description : '');
    setPrice(training ? String(training.price) : '');
    setIsContentEditable(true);
  };

  const handleSaveButtonClick = () => {
    setIsContentEditable(false);
    // TODO: валидация и отправка данных
    console.log({
      title,
      description,
      price,
      isSpecialOffer
    });
  };

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewsList />
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
                          <div className="training-info__input training-info__input--training">
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
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
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
                          <div className="training-info__input training-info__input--price">
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
                            <div className="training-info__error">Введите число</div>
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
                                <button className="btn training-info__buy" type="button">Купить</button>
                              )
                          }
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className={`training-video ${training?.videoUrl === '' || training?.bgImageUrl === '' ? 'training-video--load' : ''}`}>
                  <h2 className="training-video__title">Видео</h2>
                  {
                    training?.videoUrl !== '' && training?.bgImageUrl !== ''
                      ? (
                        <div className="training-video__video">
                          <div className="training-video__thumbnail">
                            <picture>
                              <source type="image/webp" srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x"/>
                              <img src="img/content/training-video/video-thumbnail.png" srcSet="img/content/training-video/video-thumbnail@2x.png 2x" width="922" height="566" alt="Обложка видео"/>
                            </picture>
                          </div>
                          <button className="training-video__play-button btn-reset">
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
                                <label>
                                  <span className="drag-and-drop__label" tabIndex={0}>
                                    Загрузите сюда файлы формата MOV, AVI или MP4
                                    <svg width="20" height="20" aria-hidden="true">
                                      <use xlinkHref="#icon-import-video"></use>
                                    </svg>
                                  </span>
                                  <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4"/>
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
                      userRole === UserRole.Coach
                        ? (
                          <div className="training-video__edit-buttons">
                            <button className="btn" type="button">Сохранить</button>
                            <button className="btn btn--outlined" type="button">Удалить</button>
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
    </>
  );
}

export default TrainingCard;
