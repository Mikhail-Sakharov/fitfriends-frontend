import {FormEvent, useEffect, useState} from 'react';
import RangeSlider from '../range-slider/range-slider';
import {Duration} from '../../types/duration.enum';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FILTER_QUERY_DELAY, RatingCount, TrainingCaloriesCount, TrainingPrice} from '../../const';
import {fetchMyTrainingsAction} from '../../store/api-actions';
import {debounce} from '../../helpers';
import {nanoid} from 'nanoid';
import {getAllExistingTrainings} from '../../store/training-data/selectors';

function TrainingsFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const allExistingTrainings = useAppSelector(getAllExistingTrainings);

  const currentTrainingsPrices = allExistingTrainings.length !== 0
    ? allExistingTrainings.map((training) => training.price) as number[]
    : [TrainingPrice.MIN, TrainingPrice.MAX];
  const minCurrentPrice = Math.min(...currentTrainingsPrices);
  const maxCurrentPrice = Math.max(...currentTrainingsPrices);

  const currentTrainingsCaloriesCounts = allExistingTrainings.length !== 0
    ? allExistingTrainings.map((training) => training.caloriesCount)
    : [TrainingCaloriesCount.MIN, TrainingCaloriesCount.MAX];
  const minCurrentCaloriesCount = Math.min(...currentTrainingsCaloriesCounts);
  const maxCurrentCaloriesCount = Math.max(...currentTrainingsCaloriesCounts);

  // значения
  const [price, setPrice] = useState<number[]>([]);
  const [caloriesCount, setCaloriesCount] = useState<number[]>([]);
  const [duration, setDuration] = useState<Duration[]>([]);

  // фильтры
  const [priceFilter, setPriceFilter] = useState<number[]>([]);
  const [caloriesCountFilter, setCaloriesCountFilter] = useState<number[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const [durationFilter, setDurationFilter] = useState<Duration[]>([]);

  useEffect(() => {
    dispatch(fetchMyTrainingsAction({
      minPrice: priceFilter[0],
      maxPrice: priceFilter[1],
      minCaloriesCount: caloriesCountFilter[0],
      maxCaloriesCount: caloriesCountFilter[1],
      minRating: ratingFilter[0],
      maxRating: ratingFilter[1],
      duration: durationFilter.join(','),
    }));
  }, [caloriesCountFilter, dispatch, durationFilter, priceFilter, ratingFilter]);

  const setPriceFilterDebounced = debounce<number[]>((arg) => setPriceFilter(arg), FILTER_QUERY_DELAY);
  const setCaloriesCountFilterDebounced = debounce<number[]>((arg) => setCaloriesCountFilter(arg), FILTER_QUERY_DELAY);
  const setDurationFilterDebounced = debounce<(prevState: Duration[]) => Duration[]>((arg) => setDurationFilter(arg), FILTER_QUERY_DELAY);
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

  const handleDurationInputChange = (option: Duration) => {
    if (durationFilter.includes(option)) {
      setDuration((prevState) => prevState.filter((durationValue) => durationValue !== option));
      setDurationFilterDebounced((prevState) => prevState.filter((durationValue) => durationValue !== option));
    } else {
      setDuration((prevState) => [...prevState, option]);
      setDurationFilterDebounced((prevState) => [...prevState, option]);
    }
  };

  return (
    <form className="my-training-form__form" data-testid="trainings-filter">
      <div className="my-training-form__block my-training-form__block--price">
        <h4 className="my-training-form__block-title">Цена, ₽</h4>
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
      <div className="my-training-form__block my-training-form__block--calories">
        <h4 className="my-training-form__block-title">Калории</h4>
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
      <div className="my-training-form__block my-training-form__block--raiting">
        <h4 className="my-training-form__block-title">Рейтинг</h4>
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
      <div className="my-training-form__block my-training-form__block--duration">
        <h4 className="my-training-form__block-title">Длительность</h4>
        <ul className="my-training-form__check-list">
          {
            Object.values(Duration).map((option) => (
              <li key={nanoid()} className="my-training-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      onChange={() => handleDurationInputChange(option)}
                      checked={duration.includes(option)}
                      type="checkbox" value="duration-1" name="duration"
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
    </form>
  );
}

export default TrainingsFilter;
