import {useRef, useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import RangeSlider from '../range-slider/range-slider';
import {debounce} from '../../helpers';
import {FILTER_QUERY_DELAY} from '../../const';
import {getAllTheGyms} from '../../store/gyms-data/selectors';
import {fetchGymsCatalogAction, fetchMyFavoriteGymsAction} from '../../store/api-actions';
import {nanoid} from 'nanoid';
import {SubwayStation} from '../../types/subway-station.enum';
import {GymFeatures} from '../../types/gym-features.enum';

export const MAX_LOCATION_TYPES_COUNT_PER_PAGE = 4;

function GymsCatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  // формирование набора чекбокс-фильтров на основе всех имеющихся вариантов (зависит от данных в БД)
  // ----- если нужно формировать динамически - изменить селектор на getCurrentRequestGyms
  const allTheGyms = useAppSelector(getAllTheGyms);

  // данные о ценах из запроса залов без фильтров
  const existingPrices = allTheGyms.map((gym) => gym.price);
  const minCurrentCatalogPrice = Math.min(...existingPrices);
  const maxCurrentCatalogPrice = Math.max(...existingPrices);

  // данные о локациях из запроса залов без фильтров (для отрисовки чекбоксов)
  // ----- т.е. учитываются и отрисовываются только варианты, имеющиеся в БД
  const existingLocations = Array.from(new Set(allTheGyms.map((gym) => gym.location)));
  const [curentLocationTypesPage, setCurentLocationTypesPage] = useState(1);
  const locationTypesPagesCount = Math.ceil(existingLocations.length / MAX_LOCATION_TYPES_COUNT_PER_PAGE);

  const handleShowMoreLocationsButtonClick = () => {
    if (curentLocationTypesPage < locationTypesPagesCount) {
      setCurentLocationTypesPage((prevState) => prevState + 1);
    }
  };

  // данные об опциях залов из запроса залов без фильтров (для отрисовки чекбоксов)
  // ----- т.е. учитываются и отрисовываются только варианты, имеющиеся в БД
  const existingFeatures = Array.from(new Set(allTheGyms.reduce((res, gym) => res.concat(gym.features), [] as GymFeatures[])));

  // значения фильтров
  const [priceFilter, setPriceFilter] = useState<number[]>([]);
  const [locationFilter, setLocationFilter] = useState<SubwayStation[]>([]);
  const [featuresFilter, setFeaturesFilter] = useState<GymFeatures[]>([]);
  const [isVerifiedFilter, setIsVerifiedFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchGymsCatalogAction({
      minPrice: priceFilter[0],
      maxPrice: priceFilter[1],
      location: locationFilter.join(','),
      features: featuresFilter.join(','),
      isVerified: isVerifiedFilter
    }));
    dispatch(fetchMyFavoriteGymsAction());
  }, [dispatch, featuresFilter, isVerifiedFilter, locationFilter, priceFilter]);

  const setPriceDebounced = debounce<number[]>((arg) => setPriceFilter(arg), FILTER_QUERY_DELAY);

  const handleMinPriceInputChange = () => {
    const value = Number(minPriceRef.current?.value);
    setPriceDebounced([value, priceFilter[1]]);
  };

  const handleMaxPriceInputChange = () => {
    const value = Number(maxPriceRef.current?.value);
    setPriceDebounced([priceFilter[0], value]);
  };

  const handleLocationInputChange = (location: SubwayStation) => {
    setLocationFilter((prevState) => {
      const isInLocationState = prevState.some((item) => item === location);
      if (isInLocationState) {
        return prevState.filter((item) => item !== location);
      } else {
        return [...prevState, location];
      }
    });
  };

  const handleFeatureInputChange = (feature: GymFeatures) => {
    setFeaturesFilter((prevState) => {
      const isInFeaturesState = prevState.some((item) => item === feature);
      if (isInFeaturesState) {
        return prevState.filter((item) => item !== feature);
      } else {
        return [...prevState, feature];
      }
    });
  };

  const handleIsVerifiedInputChange = () => {
    setIsVerifiedFilter((prevState) => !prevState);
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
          {
            existingLocations.slice(0, curentLocationTypesPage * MAX_LOCATION_TYPES_COUNT_PER_PAGE).map((location) => (
              <li key={nanoid()} className="gym-hall-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      onChange={() => handleLocationInputChange(location)}
                      type="checkbox" value="location-1" name="location"
                      checked={locationFilter.includes(location)}
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      {location}
                    </span>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
        {
          curentLocationTypesPage < locationTypesPagesCount
            && (
              <button
                onClick={handleShowMoreLocationsButtonClick}
                className="btn-show-more gym-hall-form__btn-show" type="button"
              >
                <span>Посмотреть все</span>
                <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                  <use xlinkHref="#arrow-down"></use>
                </svg>
              </button>
            )
        }
      </div>
      <div className="gym-hall-form__block gym-hall-form__block--addition">
        <h4 className="gym-hall-form__block-title">Дополнительно</h4>
        <ul className="gym-hall-form__check-list">
          {
            existingFeatures.map((feature) => (
              <li key={nanoid()} className="gym-hall-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      onChange={() => handleFeatureInputChange(feature)}
                      type="checkbox" value="addition-1" name="addition"
                      checked={featuresFilter.includes(feature)}
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      {feature}
                    </span>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="gym-hall-form__block">
        <h3 className="gym-hall-form__title gym-hall-form__title--status">Статус</h3>
        <div className="custom-toggle custom-toggle--switch">
          <label>
            <input
              onChange={handleIsVerifiedInputChange}
              type="checkbox" value="status-1" name="status"
              checked={isVerifiedFilter}
            />
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
