import Header from '../../components/header/header';
import {WeekDay} from '../../types/week-day.enum';
import {MealType} from '../../types/meal-type.enum';
import {FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {createFoodDiaryAction, fetchFoodDiariesAction, updateFoodDiaryAction} from '../../store/api-actions';
import {getFoodDiaries} from '../../store/diaries-data/selectors';
import {setDataLoadedStatus} from '../../store/app-data/app-data';

function FoodDiary(): JSX.Element {
  const dispatch = useAppDispatch();

  const diaries = useAppSelector(getFoodDiaries);

  const initialState = {
    [WeekDay.Monday]: {
      [MealType.Breakfast]: undefined,
      [MealType.Dinner]: undefined,
      [MealType.Snack]: undefined,
      [MealType.Supper]: undefined,
    },
    [WeekDay.Tuesday]: {
      [MealType.Breakfast]: undefined,
      [MealType.Dinner]: undefined,
      [MealType.Snack]: undefined,
      [MealType.Supper]: undefined,
    },
    [WeekDay.Wednesday]: {
      [MealType.Breakfast]: undefined,
      [MealType.Dinner]: undefined,
      [MealType.Snack]: undefined,
      [MealType.Supper]: undefined,
    },
    [WeekDay.Thursday]: {
      [MealType.Breakfast]: undefined,
      [MealType.Dinner]: undefined,
      [MealType.Snack]: undefined,
      [MealType.Supper]: undefined,
    },
    [WeekDay.Friday]: {
      [MealType.Breakfast]: undefined,
      [MealType.Dinner]: undefined,
      [MealType.Snack]: undefined,
      [MealType.Supper]: undefined,
    },
    [WeekDay.Saturday]: {
      [MealType.Breakfast]: undefined,
      [MealType.Dinner]: undefined,
      [MealType.Snack]: undefined,
      [MealType.Supper]: undefined,
    },
    [WeekDay.Sunday]: {
      [MealType.Breakfast]: undefined,
      [MealType.Dinner]: undefined,
      [MealType.Snack]: undefined,
      [MealType.Supper]: undefined,
    },
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    dispatch(fetchFoodDiariesAction());
  }, []);

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const inputName = evt.currentTarget.name;
    const inputValue = evt.currentTarget.value;
    const weekDay = inputName.match(/.+(?=-)/) as unknown as WeekDay;
    const mealType = inputName.match(/(?<=-).+/) as unknown as MealType;

    setState((prevSate) => {
      const updatedWeekDay = {...prevSate[weekDay], [mealType]: inputValue};
      return {...prevSate, [weekDay]: updatedWeekDay};
    });
  };

  const updateFoodDiary = async (id: string, caloriesCount: number) => {
    dispatch(setDataLoadedStatus(true));
    await dispatch(updateFoodDiaryAction({
      id,
      caloriesCount
    }));
    dispatch(fetchFoodDiariesAction());
    dispatch(setDataLoadedStatus(false));
  };

  const createFoodDiary = async (weekDay: WeekDay, caloriesCount: number, mealType: MealType) => {
    dispatch(setDataLoadedStatus(true));
    await dispatch(createFoodDiaryAction({
      weekDay,
      caloriesCount,
      mealType
    }));
    dispatch(fetchFoodDiariesAction());
    dispatch(setDataLoadedStatus(false));
  };

  const handleSaveButtonClick = () => {
    Object.values(WeekDay).forEach((weekDay) => {
      Object.values(MealType).forEach((mealType) => {
        const caloriesCountStateValue = state[weekDay][mealType];
        const respectiveDiaryDatabaseEntry = diaries.find((diary) => diary.weekDay === weekDay && diary.mealType === mealType);
        if (respectiveDiaryDatabaseEntry && caloriesCountStateValue) {
          updateFoodDiary(respectiveDiaryDatabaseEntry.id, Number(caloriesCountStateValue));
        }
        if (!respectiveDiaryDatabaseEntry && caloriesCountStateValue) {
          createFoodDiary(
            weekDay,
            Number(caloriesCountStateValue),
            mealType
          );
        }
      });
    });
  };

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="food-diary">
                  <div className="food-diary__wrapper">
                    <h1 className="food-diary__title">Дневник питания</h1>
                    <div className="food-diary__block">
                      <div className="food-diary__sidebar">
                        <svg className="food-diary__icon" width="21" height="18" aria-hidden="true">
                          <use xlinkHref="#icon-book"></use>
                        </svg>
                        <ul className="food-diary__list">
                          <li className="food-diary__item">
                            <span>Завтрак</span>
                          </li>
                          <li className="food-diary__item">
                            <span>Обед</span>
                          </li>
                          <li className="food-diary__item">
                            <span>Ужин</span>
                          </li>
                          <li className="food-diary__item">
                            <span>Перекус</span>
                          </li>
                        </ul>
                        <p className="food-diary__total">Итого</p>
                      </div>
                      <div className="food-diary__content">
                        <form action="#" method="get">
                          <table className="food-diary__table">
                            <tr className="food-diary__row food-diary__row--head">
                              <th className="food-diary__cell food-diary__cell--head">пн</th>
                              <th className="food-diary__cell food-diary__cell--head">вт</th>
                              <th className="food-diary__cell food-diary__cell--head">ср</th>
                              <th className="food-diary__cell food-diary__cell--head">чт</th>
                              <th className="food-diary__cell food-diary__cell--head">пт</th>
                              <th className="food-diary__cell food-diary__cell--head">сб</th>
                              <th className="food-diary__cell food-diary__cell--head">вс</th>
                            </tr>
                            <tr className="food-diary__row">
                              {
                                Object.values(WeekDay).map((weekDay) => {
                                  const diary = diaries.find((item) => item.weekDay === weekDay && item.mealType === MealType.Breakfast);
                                  return (
                                    <td key={`${weekDay}-${MealType.Breakfast}`} className="food-diary__cell">
                                      <div className="food-diary__input">
                                        <label>
                                          <input
                                            onChange={handleInputChange}
                                            type="number"
                                            name={`${weekDay}-${MealType.Breakfast}`}
                                            value={state[weekDay][MealType.Breakfast]}
                                            defaultValue={diary?.caloriesCount ?? 0}
                                          />
                                        </label>
                                      </div>
                                    </td>
                                  );
                                })
                              }
                            </tr>
                            <tr className="food-diary__row">
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="810"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="810"/>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr className="food-diary__row">
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="770"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="770"/>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr className="food-diary__row">
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="390"/>
                                  </label>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__input">
                                  <label>
                                    <input type="number" name="calories" defaultValue="390"/>
                                  </label>
                                </div>
                              </td>
                            </tr>
                            <tr className="food-diary__row">
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                              <td className="food-diary__cell">
                                <div className="food-diary__total-value">
                                  <span>2 590</span>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </form>
                      </div>
                    </div>
                    <div className="total food-diary__total-per-week">
                      <div className="total__title-wrapper">
                        <div className="total__title">Итого за неделю</div>
                        <svg className="total__icon" width="30" height="30" aria-hidden="true">
                          <use xlinkHref="#icon-chart-with-arrow"></use>
                        </svg>
                      </div>
                      <p className="total__number">18 130</p>
                    </div>
                    <button
                      onClick={handleSaveButtonClick}
                      className="btn food-diary__button" type="button"
                    >
                      Сохранить
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default FoodDiary;
