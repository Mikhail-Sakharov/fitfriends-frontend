import {useEffect, useState} from 'react';
import {GymRdo} from '../../types/gym.rdo';
import {PaymentMethod} from '../../types/order.rdo';
import {useAppDispatch} from '../../hooks';
import {setDataLoadedStatus} from '../../store/app-data/app-data';
import {buyGymMembershipAction, fetchMyPurchasesAction} from '../../store/api-actions';

type PopupMembershipProps = {
  gym: GymRdo;
  setPopupOpened: (state: boolean) => void;
};

function PopupMembership({gym, setPopupOpened}: PopupMembershipProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

  const [paymentMethodError, setPaymentMethodError] = useState('');

  useEffect(() => {
    if (gym.price) {
      setTotalOrderPrice(quantity * gym.price);
    }
  }, [gym.price, quantity]);

  const handleMinusButtonClick = () => {
    setQuantity((prevState) => prevState > 1 ? prevState - 1 : prevState);
  };

  const handlePlusButtonClick = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const buyGymMembership = async () => {
    if (gym.price && paymentMethod) {
      dispatch(setDataLoadedStatus(true));
      await dispatch(buyGymMembershipAction({
        gymId: gym.id,
        price: gym.price,
        quantity,
        totalOrderPrice,
        paymentMethod
      }));
      await dispatch(fetchMyPurchasesAction());
      dispatch(setDataLoadedStatus(false));
    }
  };

  const handleBuyButtonClick = () => {
    if (!paymentMethod) {
      setPaymentMethodError('Выберите способ оплаты');
    } else {
      buyGymMembership();
    }
  };

  return (
    <main>
      <div className="popup-form popup-form--membership">
        <section className="popup">
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">Оформить абонемент</h2>
              <button
                onClick={() => setPopupOpened(false)}
                className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close"
              >
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div className="popup__content popup__content--membership">
              <div className="popup__product">
                <div className="popup__product-image">
                  <picture>
                    <img src={gym.images[0]} width="98" height="80" alt=""/>
                  </picture>
                </div>
                <div className="popup__product-info">
                  <h3 className="popup__product-title">
                    {gym.title}
                  </h3>
                  <p className="popup__product-price">
                    {`${gym.price} ₽`}
                  </p>
                </div>
                <div className="popup__product-quantity">
                  <p className="popup__quantity">Количество</p>
                  <div className="input-quantity">
                    <button
                      onClick={handleMinusButtonClick}
                      className="btn-icon btn-icon--quantity" type="button" aria-label="minus"
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-minus"></use>
                      </svg>
                    </button>
                    <div className="input-quantity__input">
                      <label>
                        <input
                          value={quantity}
                          size={2} type="number" readOnly
                        />
                      </label>
                    </div>
                    <button
                      onClick={handlePlusButtonClick}
                      className="btn-icon btn-icon--quantity" type="button" aria-label="plus"
                    >
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-plus"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <section className="services-check">
                <h4 className="services-check__title">Дополнительные услуги (1000 ₽)</h4>
                <ul className="services-check__list">
                  <li className="services-check__item">
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">Бассейн</span>
                      </label>
                    </div>
                  </li>
                  <li className="services-check__item">
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">Массаж</span>
                      </label>
                    </div>
                  </li>
                  <li className="services-check__item">
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">Сауна</span>
                      </label>
                    </div>
                  </li>
                  <li className="services-check__item">
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">Детская комната</span>
                      </label>
                    </div>
                  </li>
                </ul>
              </section>
              <section
                className={`
                    payment-method
                    ${!paymentMethod && paymentMethodError ? 'custom-input--error' : ''}
                  `}
              >
                <h4 className="payment-method__title">Выберите способ оплаты</h4>
                <ul className="payment-method__list">
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          onChange={() => setPaymentMethod(PaymentMethod.Visa)}
                          type="radio" name="payment-purchases" aria-label="Visa."
                        />
                        <span className="btn-radio-image__image">
                          <svg width="58" height="20" aria-hidden="true">
                            <use xlinkHref="#visa-logo"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          onChange={() => setPaymentMethod(PaymentMethod.Mir)}
                          type="radio" name="payment-purchases" aria-label="Мир."
                        />
                        <span className="btn-radio-image__image">
                          <svg width="66" height="20" aria-hidden="true">
                            <use xlinkHref="#mir-logo"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          onChange={() => setPaymentMethod(PaymentMethod.Umoney)}
                          type="radio" name="payment-purchases" aria-label="Iomoney."
                        />
                        <span className="btn-radio-image__image">
                          <svg width="106" height="24" aria-hidden="true">
                            <use xlinkHref="#iomoney-logo"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                </ul>
                {
                  (!paymentMethod && paymentMethodError)
                    && (
                      <span className="custom-input__error">
                        {paymentMethodError}
                      </span>
                    )
                }
              </section>
              <div className="popup__total">
                <p className="popup__total-text">Итого</p>
                <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                  <use xlinkHref="#dash-line"></use>
                </svg>
                <p className="popup__total-price">
                  {`${totalOrderPrice}`}
                  &nbsp;₽
                </p>
              </div>
              <div className="popup__button">
                <button
                  onClick={handleBuyButtonClick}
                  className="btn" type="button"
                >
                  Купить
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PopupMembership;
