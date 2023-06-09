import {useParams} from 'react-router-dom';
import Header from '../../components/header/header';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchGymInfoAction, fetchMyPurchasesAction} from '../../store/api-actions';
import {getCurrentGym} from '../../store/gyms-data/selectors';
import {nanoid} from 'nanoid';
import PopupGymMap from '../../components/popup-gym-map/popup-gym-map';
import PopupMembership from '../../components/popup-membership/popup-membership';
import {getMyPurchases} from '../../store/user-data/selectors';
import {OrderType} from '../../types/order.rdo';
import {GymOrderRdo} from '../../types/gym-order.rdo';

function GymCard(): JSX.Element {
  const dispatch = useAppDispatch();

  const gymId = useParams().id;

  const gymInfo = useAppSelector(getCurrentGym);
  const myPurchases = useAppSelector(getMyPurchases);

  const isGymAlreadyInMyPurchases = gymInfo
    ? myPurchases
      .filter((purchase) => purchase.orderType === OrderType.Gym)
      .filter((purchase) => purchase.isCompleted === false)
      .find((purchase) => (purchase as GymOrderRdo).gym.id === gymInfo.id)
    : false;

  const slidesCount = gymInfo?.images.length;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [isMapPopupOpened, setIsMapPopupOpened] = useState(false);
  const [isGymMembershipPopupOpened, setIsGymMembershipPopupOpened] = useState(false);

  useEffect(() => {
    if (gymId) {
      dispatch(fetchGymInfoAction(gymId));
      dispatch(fetchMyPurchasesAction());
    }
  }, [dispatch, gymId]);

  const handlePrevButtonClick = () => {
    setCurrentSlideIndex((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      } else {
        return prevState;
      }
    });
  };

  const handleNextButtonClick = () => {
    setCurrentSlideIndex((prevState) => {
      if (slidesCount && prevState < slidesCount - 1) {
        return prevState + 1;
      } else {
        return prevState;
      }
    });
  };

  const handleLocationClick = () => {
    setIsMapPopupOpened(true);
  };

  const handleCreateGymOrder = () => {
    setIsGymMembershipPopupOpened(true);
  };

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button
                onClick={() => window.history.back()}
                className="btn-flat inner-page__back" type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="gym-card">
                  <h1 className="visually-hidden">Карточка зала</h1>
                  <div className="gym-card__wrapper">
                    <div className="gym-card__content">
                      <div className="gym-card__head">
                        <h2 className="gym-card__title">
                          {gymInfo?.title}
                        </h2>
                        <div className="gym-card__icon">
                          <svg className="gym-card__verify-bold" width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-verify-bold"></use>
                          </svg>
                        </div>
                      </div>
                      <p
                        onClick={handleLocationClick}
                        className="gym-card__address"
                      >
                        <svg className="gym-card__icon-location" width="12" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <span>
                          {gymInfo?.location}
                        </span>
                      </p>
                      <ul className="gym-card__hashtag-list">
                        {
                          gymInfo?.features.map((feature) => (
                            <li key={nanoid()} className="gym-card__hashtag-item">
                              <div className="hashtag hashtag--white">
                                <span>
                                  {`#${feature}`}
                                </span>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                      <div className="gym-card__text">
                        <p>
                          {gymInfo?.description}
                        </p>
                      </div>
                      <div className="gym-card__rating-price">
                        <div className="gym-card__price">
                          <div className="price-service">
                            <p className="price-service__price">
                              {gymInfo?.price}
                              ₽&nbsp;
                              <span>&#47;</span>
&nbsp;занятие
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="gym-card__button">
                        <button
                          onClick={handleCreateGymOrder}
                          className="btn btn--dark-bg" type="button"
                          disabled={!!isGymAlreadyInMyPurchases}
                        >
                          оформить абонемент
                        </button>
                      </div>
                    </div>
                    <section className="slider-gyms">
                      <h2 className="visually-hidden">Слайдер с фотографиями спортивных залов.</h2>
                      <ul className="slider-gyms__list">
                        <li>
                          <button
                            onClick={handlePrevButtonClick}
                            className="btn-icon slider-gyms__btn slider-gyms__btn--prev" type="button" aria-label="prev"
                          >
                            <svg width="16" height="14" aria-hidden="true">
                              <use xlinkHref="#arrow-left"></use>
                            </svg>
                          </button>
                          <button
                            onClick={handleNextButtonClick}
                            className="btn-icon slider-gyms__btn slider-gyms__btn--next" type="button" aria-label="next"
                          >
                            <svg width="16" height="14" aria-hidden="true">
                              <use xlinkHref="#arrow-right"></use>
                            </svg>
                          </button>
                        </li>
                        {
                          gymInfo?.images.map((image, index) => (
                            <li
                              className={`
                                slider-gyms__slide slider-gyms__slide
                                ${index === currentSlideIndex ? 'slider-gyms__slide--current' : ''}
                              `}
                              key={nanoid()}
                            >
                              <div className="slider-gyms__img">
                                <picture>
                                  <img src={image} width="826" height="773" alt="Фото спортивного снаряжения."/>
                                </picture>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      {
        isMapPopupOpened
          && <PopupGymMap location={gymInfo?.location} title={gymInfo?.title} setPopupOpened={setIsMapPopupOpened}/>
      }
      {
        (isGymMembershipPopupOpened && gymInfo)
          && <PopupMembership gym={gymInfo} setPopupOpened={setIsGymMembershipPopupOpened}/>
      }
    </>
  );
}

export default GymCard;
