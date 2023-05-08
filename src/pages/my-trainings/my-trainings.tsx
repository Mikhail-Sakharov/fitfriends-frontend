import Header from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getTrainings} from '../../store/user-data/selectors';
import {useEffect, useState} from 'react';
import {fetchMyTrainingsAction} from '../../store/api-actons';
import {nanoid} from 'nanoid';
import TrainingThumbnail from '../../components/training-thumbnail/training-thumbnail';
import {MAX_TRAININGS_COUNT_PER_PAGE} from '../../const';
import RangeSlider from '../../components/range-slider/range-slider';

function MyTrainings(): JSX.Element {
  const dispatch = useAppDispatch();

  const trainings = useAppSelector(getTrainings);
  const [trainingsPage, setTrainingsPage] = useState(1);
  const pagesCount = Math.ceil(trainings.length / MAX_TRAININGS_COUNT_PER_PAGE);

  const currentTrainingsPrices = trainings.map((training) => training.price) as number[];
  const minCurrentPrice = Math.min(...currentTrainingsPrices);
  const maxCurrentPrice = Math.max(...currentTrainingsPrices);

  const currentTrainingsCaloriesCounts = trainings.map((training) => training.caloriesCount);
  const minCurrentCaloriesCount = Math.min(...currentTrainingsCaloriesCounts);
  const maxCurrentCaloriesCount = Math.max(...currentTrainingsCaloriesCounts);

  const [priceFilter, setPriceFilter] = useState<number[]>([minCurrentPrice, maxCurrentPrice]);
  const [caloriesCountFilter, setCaloriesCountFilter] = useState<number[]>([minCurrentCaloriesCount, maxCurrentCaloriesCount]);

  useEffect(() => {
    dispatch(fetchMyTrainingsAction());
  }, [dispatch]);

  const handleShowMoreButtonClick = () => {
    setTrainingsPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
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
                            placeholder={minCurrentPrice.toString()}
                            value={priceFilter[0].toString()}
                            type="number" id="text-min"
                            name="text-min"
                          />
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input
                            placeholder={maxCurrentPrice.toString()}
                            value={priceFilter[1].toString()}
                            type="number" id="text-max" name="text-max"
                          />
                          <label htmlFor="text-max">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <RangeSlider
                          minRangeValue={minCurrentPrice}
                          maxRangeValue={maxCurrentPrice}
                          setExternalValue={setPriceFilter}
                        />
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--calories">
                      <h4 className="my-training-form__block-title">Калории</h4>
                      <div className="filter-calories">
                        <div className="filter-calories__input-text filter-calories__input-text--min">
                          <input
                            placeholder={minCurrentCaloriesCount.toString()}
                            value={caloriesCountFilter[0].toString()}
                            type="number" id="text-min-cal" name="text-min-cal"
                          />
                          <label htmlFor="text-min-cal">от</label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input
                            placeholder={maxCurrentCaloriesCount.toString()}
                            value={caloriesCountFilter[1].toString()}
                            type="number" id="text-max-cal" name="text-max-cal"
                          />
                          <label htmlFor="text-max-cal">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <RangeSlider
                          minRangeValue={minCurrentCaloriesCount}
                          maxRangeValue={maxCurrentCaloriesCount}
                          setExternalValue={setCaloriesCountFilter}
                        />
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--raiting">
                      <h4 className="my-training-form__block-title">Рейтинг</h4>
                      <div className="filter-raiting">
                        <div className="filter-raiting__scale">
                          <div className="filter-raiting__bar">
                            <span className="visually-hidden">Полоса прокрутки</span>
                          </div>
                        </div>
                        <div className="filter-raiting__control">
                          <button className="filter-raiting__min-toggle">
                            <span className="visually-hidden">Минимальное значение</span>
                          </button>
                          <span>1</span>
                          <button className="filter-raiting__max-toggle">
                            <span className="visually-hidden">Максимальное значение</span>
                          </button>
                          <span>5</span>
                        </div>
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--duration">
                      <h4 className="my-training-form__block-title">Длительность</h4>
                      <ul className="my-training-form__check-list">
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="duration-1" name="duration"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">10 мин - 30 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="duration-1" name="duration" checked/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">30 мин - 50 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="duration-1" name="duration"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">50 мин - 80 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="duration-1" name="duration"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">80 мин - 100 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="duration-1" name="duration"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">100 мин - 120 мин</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    {
                      trainings.slice(0, ((trainingsPage - 1) * MAX_TRAININGS_COUNT_PER_PAGE) + MAX_TRAININGS_COUNT_PER_PAGE).map((training) => (
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
                            className="btn show-more__button" type="button"
                          >
                            Вернуться в начало
                          </button>
                        )
                        : (
                          <button
                            onClick={handleShowMoreButtonClick}
                            className="btn show-more__button show-more__button--more" type="button"
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
