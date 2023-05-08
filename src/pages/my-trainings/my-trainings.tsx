import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentRequestTrainings, getAllExistingTrainings} from '../../store/user-data/selectors';
import {FormEvent, useEffect, useLayoutEffect, useState} from 'react';
import {fetchMyTrainingsAction} from '../../store/api-actons';
import {nanoid} from 'nanoid';
import TrainingThumbnail from '../../components/training-thumbnail/training-thumbnail';
import {FILTER_QUERY_DELAY, MAX_TRAININGS_COUNT_PER_PAGE, RatingCount, TrainingCaloriesCount, TrainingPrice} from '../../const';
import RangeSlider from '../../components/range-slider/range-slider';
import {Duration} from '../../types/duration.enum';
import {debounce} from '../../helpers';

function MyTrainings(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentRequesttrainings = useAppSelector(getCurrentRequestTrainings);
  const allExistingTrainings = useAppSelector(getAllExistingTrainings);

  const [trainingsPage, setTrainingsPage] = useState(1);
  const pagesCount = Math.ceil(currentRequesttrainings.length / MAX_TRAININGS_COUNT_PER_PAGE);

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
  const [duration, setDuration] = useState<Duration[]>([]);

  // фильтры
  const [priceFilter, setPriceFilter] = useState<number[]>([]);
  const [caloriesCountFilter, setCaloriesCountFilter] = useState<number[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number[]>([RatingCount.MIN, RatingCount.MAX]);
  const [durationFilter, setDurationFilter] = useState<Duration[]>([]);

  // запрос всех тренировок без фильтров
  useLayoutEffect(() => {
    dispatch(fetchMyTrainingsAction());
  }, [dispatch]);

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

  const handleShowMoreButtonClick = () => {
    setTrainingsPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  const setPriceFilterDebounced = debounce<number[]>((arg) => setPriceFilter(arg), FILTER_QUERY_DELAY);
  const setCaloriesCountFilterDebounced = debounce<number[]>((arg) => setCaloriesCountFilter(arg), FILTER_QUERY_DELAY);
  const setDurationFilterDebounced = debounce<(prevState: Duration[]) => Duration[]>((arg) => setDurationFilter(arg), FILTER_QUERY_DELAY);
  const setRaitingFilterDebounced = debounce<number[]>((arg) => setRatingFilter(arg), FILTER_QUERY_DELAY);

  const handlePriceInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const inputValue = Number(evt.currentTarget.value);
    const inputName = evt.currentTarget.name;
    switch (inputName) {
      case 'text-min':
        setPriceFilterDebounced([inputValue, priceFilter[1]]);
        break;
      case 'text-max':
        setPriceFilterDebounced([priceFilter[0], inputValue]);
        break;
    }
  };

  const handleCaloriesCountInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const inputValue = Number(evt.currentTarget.value);
    const inputName = evt.currentTarget.name;
    switch (inputName) {
      case 'text-min-cal':
        setCaloriesCountFilterDebounced([inputValue, caloriesCountFilter[1]]);
        break;
      case 'text-max-cal':
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
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <button className="btn-flat btn-flat--underlined my-training-form__btnback" type="button">
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="my-training-form__title">фильтры</h3>
                  <form className="my-training-form__form">
                    <div className="my-training-form__block my-training-form__block--price">
                      <h4 className="my-training-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input
                            onChange={handlePriceInputChange}
                            value={priceFilter[0]}
                            placeholder={minCurrentPrice.toString()}
                            type="number" id="text-min"
                            name="text-min"
                          />
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input
                            onChange={handlePriceInputChange}
                            value={priceFilter[1]}
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
                          setExternalValue={setPriceFilterDebounced}
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
                            value={caloriesCountFilter[0]}
                            type="number" id="text-min-cal" name="text-min-cal"
                          />
                          <label htmlFor="text-min-cal">от</label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input
                            onChange={handleCaloriesCountInputChange}
                            placeholder={maxCurrentCaloriesCount.toString()}
                            value={caloriesCountFilter[1]}
                            type="number" id="text-max-cal" name="text-max-cal"
                          />
                          <label htmlFor="text-max-cal">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <RangeSlider
                          minRangeValue={minCurrentCaloriesCount}
                          maxRangeValue={maxCurrentCaloriesCount}
                          setExternalValue={setCaloriesCountFilterDebounced}
                        />
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--raiting">
                      <h4 className="my-training-form__block-title">Рейтинг</h4>
                      <div className="filter-raiting">
                        <RangeSlider
                          minRangeValue={RatingCount.MIN}
                          maxRangeValue={RatingCount.MAX}
                          setExternalValue={setRaitingFilterDebounced}
                        />
                        <div className="filter-raiting__control">
                          <div>
                            <span>1</span>
                          </div>
                          <div>
                            <span>5</span>
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
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    {
                      currentRequesttrainings.slice(0, ((trainingsPage - 1) * MAX_TRAININGS_COUNT_PER_PAGE) + MAX_TRAININGS_COUNT_PER_PAGE).map((training) => (
                        <li key={nanoid()} className="my-trainings__item">
                          <TrainingThumbnail training={training}/>
                        </li>
                      ))
                    }
                  </ul>
                  <div className="show-more my-trainings__show-more">
                    {
                      trainingsPage === pagesCount
                        ? (
                          <button
                            onClick={handleReturnToTopButtonClick}
                            className="btn show-more__button"
                            type="button"
                            disabled={currentRequesttrainings.length <= MAX_TRAININGS_COUNT_PER_PAGE}
                          >
                            Вернуться в начало
                          </button>
                        )
                        : (
                          <button
                            onClick={handleShowMoreButtonClick}
                            className="btn show-more__button show-more__button--more"
                            type="button"
                          >
                            Показать еще
                          </button>
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

export default MyTrainings;
