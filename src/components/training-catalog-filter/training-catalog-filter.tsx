import {FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchTrainingCatalogAction} from '../../store/api-actions';
import RangeSlider from '../range-slider/range-slider';
import {FILTER_QUERY_DELAY, RatingCount, TrainingCaloriesCount, TrainingPrice} from '../../const';
import {TrainingType} from '../../types/training-type.enum';
import {nanoid} from 'nanoid';
import {getTrainingCatalog} from '../../store/training-data/selectors';
import {debounce} from '../../helpers';
import {SortType} from '../../types/sort.type';
import {SortOrder} from '../../types/sort-order';

function TrainingCatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const trainingCatalog = useAppSelector(getTrainingCatalog);

  const currentTrainingsPrices = trainingCatalog.length !== 0
    ? trainingCatalog.map((training) => training.price) as number[]
    : [TrainingPrice.MIN, TrainingPrice.MAX];
  const minCurrentPrice = Math.min(...currentTrainingsPrices);
  const maxCurrentPrice = Math.max(...currentTrainingsPrices);

  const currentTrainingsCaloriesCounts = trainingCatalog.length !== 0
    ? trainingCatalog.map((training) => training.caloriesCount)
    : [TrainingCaloriesCount.MIN, TrainingCaloriesCount.MAX];
  const minCurrentCaloriesCount = Math.min(...currentTrainingsCaloriesCounts);
  const maxCurrentCaloriesCount = Math.max(...currentTrainingsCaloriesCounts);

  // значения
  const [price, setPrice] = useState<number[]>([]);
  const [caloriesCount, setCaloriesCount] = useState<number[]>([]);
  const [trainingType, setTrainingType] = useState<TrainingType[]>([]);

  // фильтры
  const [priceFilter, setPriceFilter] = useState<number[]>([]);
  const [caloriesCountFilter, setCaloriesCountFilter] = useState<number[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const [trainingTypeFilter, setTrainingTypeFilter] = useState<TrainingType[]>([]);
  const [activeSortType, setActiveSortType] = useState<SortType | undefined>(undefined);
  const [activeSortOrder, setActiveSortOrder] = useState<SortOrder | undefined>(undefined);

  useEffect(() => {
    dispatch(fetchTrainingCatalogAction({
      minPrice: priceFilter[0],
      maxPrice: priceFilter[1],
      minCaloriesCount: caloriesCountFilter[0],
      maxCaloriesCount: caloriesCountFilter[1],
      minRating: ratingFilter[0],
      maxRating: ratingFilter[1],
      trainingType: trainingTypeFilter.join(','),
      sortType: activeSortType,
      sortOrder: activeSortOrder
    }));
  }, [activeSortOrder, activeSortType, caloriesCountFilter, dispatch, priceFilter, ratingFilter, trainingTypeFilter]);

  const setPriceFilterDebounced = debounce<number[]>((arg) => setPriceFilter(arg), FILTER_QUERY_DELAY);
  const setCaloriesCountFilterDebounced = debounce<number[]>((arg) => setCaloriesCountFilter(arg), FILTER_QUERY_DELAY);
  const setTrainingTypeFilterDebounced = debounce<(prevState: TrainingType[]) => TrainingType[]>((arg) => setTrainingTypeFilter(arg), FILTER_QUERY_DELAY);
  const setRaitingFilterDebounced = debounce<number[]>((arg) => setRatingFilter(arg), FILTER_QUERY_DELAY);

  const handlePriceInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const inputValue = Number(evt.currentTarget.value);
    const inputName = evt.currentTarget.name;
    switch (inputName) {
      case 'text-min':
        setPrice([inputValue, priceFilter[1]]);
        setPriceFilterDebounced([inputValue, priceFilter[1]]);
        break;
      case 'text-max':
        setPrice([priceFilter[0], inputValue]);
        setPriceFilterDebounced([priceFilter[0], inputValue]);
        break;
    }
  };

  const handleCaloriesCountInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const inputValue = Number(evt.currentTarget.value);
    const inputName = evt.currentTarget.name;
    switch (inputName) {
      case 'text-min-cal':
        setCaloriesCount([inputValue, caloriesCountFilter[1]]);
        setCaloriesCountFilterDebounced([inputValue, caloriesCountFilter[1]]);
        break;
      case 'text-max-cal':
        setCaloriesCount([caloriesCountFilter[0], inputValue]);
        setCaloriesCountFilterDebounced([caloriesCountFilter[0], inputValue]);
        break;
    }
  };

  const handleTrainingTypeInputChange = (option: TrainingType) => {
    if (trainingTypeFilter.includes(option)) {
      setTrainingType((prevState) => prevState.filter((durationValue) => durationValue !== option));
      setTrainingTypeFilterDebounced((prevState) => prevState.filter((durationValue) => durationValue !== option));
    } else {
      setTrainingType((prevState) => [...prevState, option]);
      setTrainingTypeFilterDebounced((prevState) => [...prevState, option]);
    }
  };

  const handleSortCheaperInputChange = () => {
    setActiveSortType(SortType.Price);
    setActiveSortOrder(SortOrder.Asc);
    setPriceFilterDebounced(price);
  };

  const handleSortPricierInputChange = () => {
    setActiveSortType(SortType.Price);
    setActiveSortOrder(SortOrder.Desc);
    setPriceFilterDebounced(price);
  };

  const handleSortForFreeInputChange = () => {
    setActiveSortType(undefined);
    setActiveSortOrder(undefined);
    setPriceFilterDebounced([0, 0]);
  };

  return (
    <form className="gym-catalog-form__form">
      <div className="gym-catalog-form__block gym-catalog-form__block--price">
        <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              onChange={handlePriceInputChange}
              value={price[0]}
              placeholder={minCurrentPrice.toString()}
              type="number" id="text-min"
              name="text-min"
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              onChange={handlePriceInputChange}
              value={price[1]}
              placeholder={maxCurrentPrice.toString()}
              type="number" id="text-max"
              name="text-max"
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
        <div className="filter-range">
          <RangeSlider
            minRangeValue={minCurrentPrice}
            maxRangeValue={maxCurrentPrice}
            setExternalValues={[setPriceFilterDebounced, setPrice]}
          />
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--calories">
        <h4 className="gym-catalog-form__block-title">Калории</h4>
        <div className="filter-calories">
          <div className="filter-calories__input-text filter-calories__input-text--min">
            <input
              onChange={handleCaloriesCountInputChange}
              placeholder={minCurrentCaloriesCount.toString()}
              value={caloriesCount[0]}
              type="number" id="text-min-cal" name="text-min-cal"
            />
            <label htmlFor="text-min-cal">от</label>
          </div>
          <div className="filter-calories__input-text filter-calories__input-text--max">
            <input
              onChange={handleCaloriesCountInputChange}
              placeholder={maxCurrentCaloriesCount.toString()}
              value={caloriesCount[1]}
              type="number" id="text-max-cal" name="text-max-cal"
            />
            <label htmlFor="text-max-cal">до</label>
          </div>
        </div>
        <div className="filter-range">
          <RangeSlider
            minRangeValue={minCurrentCaloriesCount}
            maxRangeValue={maxCurrentCaloriesCount}
            setExternalValues={[setCaloriesCountFilterDebounced, setCaloriesCount]}
          />
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--rating">
        <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
        <div className="filter-raiting">
          <RangeSlider
            minRangeValue={RatingCount.MIN}
            maxRangeValue={RatingCount.MAX}
            setExternalValues={[setRaitingFilterDebounced]}
          />
          <div className="filter-raiting__control">
            <div>
              <span>
                {RatingCount.MIN}
              </span>
            </div>
            <div>
              <span>
                {RatingCount.MAX}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--type">
        <h4 className="gym-catalog-form__block-title">Тип</h4>
        <ul className="gym-catalog-form__check-list">
          {
            Object.values(TrainingType).map((option) => (
              <li key={nanoid()} className="gym-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      onChange={() => handleTrainingTypeInputChange(option)}
                      checked={trainingType.includes(option)}
                      type="checkbox" value="type-1" name="type"
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      {option}
                    </span>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--sort">
        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
        <div className="btn-radio-sort gym-catalog-form__radio">
          <label>
            <input
              onChange={handleSortCheaperInputChange}
              type="radio" name="sort"
            />
            <span className="btn-radio-sort__label">Дешевле</span>
          </label>
          <label>
            <input
              onChange={handleSortPricierInputChange}
              type="radio" name="sort"
            />
            <span className="btn-radio-sort__label">Дороже</span>
          </label>
          <label>
            <input
              onChange={handleSortForFreeInputChange}
              type="radio" name="sort"
              checked={priceFilter[0] === 0 && priceFilter[1] === 0}
            />
            <span className="btn-radio-sort__label">Бесплатные</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default TrainingCatalogFilter;
