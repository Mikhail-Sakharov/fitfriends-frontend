import {useRef, useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import RangeSlider from '../range-slider/range-slider';
import {debounce} from '../../helpers';
import {FILTER_QUERY_DELAY} from '../../const';
import {getAllTheGyms} from '../../store/gyms-data/selectors';
import {fetchGymsCatalogAction, fetchMyFavoriteGymsAction} from '../../store/api-actions';

function GymsCatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const allTheGyms = useAppSelector(getAllTheGyms);
  const existingPrices = allTheGyms.map((gym) => gym.price);
  const minCurrentCatalogPrice = Math.min(...existingPrices);
  const maxCurrentCatalogPrice = Math.max(...existingPrices);

  // значения фильтров
  const [price, setPrice] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchGymsCatalogAction({
      minPrice: price[0],
      maxPrice: price[1],
      // location:
      // features:
      // isVerified:
      // sortType:
      // sortOrder:
      // page:
      // limit:
    }));
    dispatch(fetchMyFavoriteGymsAction());
  }, [dispatch, price]);

  const setPriceDebounced = debounce<number[]>((arg) => setPrice(arg), FILTER_QUERY_DELAY);

  const handleMinPriceInputChange = () => {
    const value = Number(minPriceRef.current?.value);
    setPriceDebounced([value, price[1]]);
  };

  const handleMaxPriceInputChange = () => {
    const value = Number(maxPriceRef.current?.value);
    setPriceDebounced([price[0], value]);
  };

  return (
    <form className="gym-hall-form__form">
      <div className="gym-hall-form__block">
        <h4 className="gym-hall-form__block-title gym-hall-form__block-title--price">Цена, ₽</h4>
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              ref={minPriceRef}
              onChange={handleMinPriceInputChange}
              placeholder={minCurrentCatalogPrice.toString()}
              type="number" id="text-min"
              name="text-min"
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              ref={maxPriceRef}
              onChange={handleMaxPriceInputChange}
              placeholder={maxCurrentCatalogPrice.toString()}
              type="number" id="text-max"
              name="text-max"
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
        <div className="filter-range">
          <RangeSlider
            minRangeValue={minCurrentCatalogPrice}
            maxRangeValue={maxCurrentCatalogPrice}
            setExternalValues={[setPriceDebounced]}
          />
        </div>
      </div>
      <div className="gym-hall-form__block gym-hall-form__block--location">
        <h4 className="gym-hall-form__block-title">Локация, станция метро</h4>
        <ul className="gym-hall-form__check-list">
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="location-1" name="location" checked/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Автово</span>
              </label>
            </div>
          </li>
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="location-1" name="location" checked/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Адмиралтейская</span>
              </label>
            </div>
          </li>
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="location-1" name="location" checked/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Академическая</span>
              </label>
            </div>
          </li>
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="location-1" name="location"/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Балтийская</span>
              </label>
            </div>
          </li>
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="location-1" name="location"/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Бухарестская</span>
              </label>
            </div>
          </li>
        </ul>
        <button className="btn-show-more gym-hall-form__btn-show" type="button">
          <span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      </div>
      <div className="gym-hall-form__block gym-hall-form__block--addition">
        <h4 className="gym-hall-form__block-title">Дополнительно</h4>
        <ul className="gym-hall-form__check-list">
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="addition-1" name="addition"/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Бассейн</span>
              </label>
            </div>
          </li>
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="addition-1" name="addition"/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Парковка</span>
              </label>
            </div>
          </li>
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="addition-1" name="addition"/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Массаж</span>
              </label>
            </div>
          </li>
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="addition-1" name="addition"/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Детская комната</span>
              </label>
            </div>
          </li>
          <li className="gym-hall-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" value="addition-1" name="addition" checked/>
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">Сауна</span>
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div className="gym-hall-form__block">
        <h3 className="gym-hall-form__title gym-hall-form__title--status">Статус</h3>
        <div className="custom-toggle custom-toggle--switch">
          <label>
            <input type="checkbox" value="status-1" name="status"/>
            <span className="custom-toggle__icon">
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-check"></use>
              </svg>
            </span>
            <span className="custom-toggle__label">Только проверенные</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default GymsCatalogFilter;
