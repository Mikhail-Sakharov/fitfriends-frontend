import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFoodDiariesAction, fetchTrainingDiariesAction} from '../../store/api-actions';
import {getFoodDiaries, getTrainingDiaries} from '../../store/diaries-data/selectors';
import {WeekDay, WeekDayMap} from '../../types/week-day.enum';
import {nanoid} from 'nanoid';
import {MAX_PROGRESS_DASHBOARD_ITEMS_COUNT, MAX_PROGRESS_DASHBOARD_ITEMS_PER_PAGE, WEEK_DAYS} from '../../const';

function MyProgress(): JSX.Element {
  const dispatch = useAppDispatch();

  const foodDiaries = useAppSelector(getFoodDiaries);
  const trainingDiaries = useAppSelector(getTrainingDiaries);

  const [progressCurrentPage, setProgressCurrentPage] = useState(1);

  const maxProgressPagesCount = Math.ceil(MAX_PROGRESS_DASHBOARD_ITEMS_COUNT / MAX_PROGRESS_DASHBOARD_ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchFoodDiariesAction());
    dispatch(fetchTrainingDiariesAction());
  }, [dispatch]);

  const handleBackArrowButtonClick = () => {
    setProgressCurrentPage((prevState) => prevState > 1 ? prevState - 1 : prevState);
  };

  const handleNextArrowButtonClick = () => {
    setProgressCurrentPage((prevState) => progressCurrentPage < maxProgressPagesCount ? prevState + 1 : prevState);
  };

  return (
    <section className="my-progress personal-account-user__my-progress">
      <div className="my-progress__sidebar">
        <svg className="my-progress__icon" width="46" height="51" aria-hidden="true">
          <use xlinkHref="#icon-chart-filled"></use>
        </svg>
        <ul className="my-progress__list">
          <li className="my-progress__item">
            <span>поступило, Ккал</span>
          </li>
          <li className="my-progress__item">
            <span>
              ушло,
              <br/>
              {' '}
              Ккал
            </span>
          </li>
          <li className="my-progress__item">
            <span>Итого за&nbsp;день, Ккал</span>
          </li>
        </ul>
      </div>
      <div className="my-progress__content">
        <div className="my-progress__title-wrapper">
          <h2 className="my-progress__title">Мой прогресс</h2>
          <div className="my-progress__controls">
            <button
              onClick={handleBackArrowButtonClick}
              className="btn-icon btn-icon--outlined my-progress__control" type="button" aria-label="previous"
            >
              <svg width="11" height="8" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button
              onClick={handleNextArrowButtonClick}
              className="btn-icon btn-icon--outlined my-progress__control" type="button" aria-label="next"
            >
              <svg width="11" height="8" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
        </div>
        <table className="my-progress__table">
          <tr className="my-progress__row my-progress__row--head">
            {
              WEEK_DAYS
                .slice((progressCurrentPage - 1) * 3, progressCurrentPage * MAX_PROGRESS_DASHBOARD_ITEMS_PER_PAGE)
                .map((dayName) => (
                  <th key={nanoid()} className="my-progress__cell my-progress__cell--head">
                    {dayName}
                  </th>
                ))
            }
          </tr>
          <tr className="my-progress__row">
            {
              Object.values(WeekDay)
                .slice((progressCurrentPage - 1) * 3, progressCurrentPage * MAX_PROGRESS_DASHBOARD_ITEMS_PER_PAGE)
                .map((weekDay) => (
                  <td key={nanoid()} className="my-progress__cell">
                    {
                      foodDiaries
                        .filter((diary) => diary.weekDay === weekDay)
                        .reduce((res, diary) => res + diary.caloriesCount, 0)
                    }
                  </td>
                ))
            }
          </tr>
          <tr className="my-progress__row">
            {
              Object.values(WeekDay)
                .slice((progressCurrentPage - 1) * 3, progressCurrentPage * MAX_PROGRESS_DASHBOARD_ITEMS_PER_PAGE)
                .map((weekDay) => (
                  <td key={nanoid()} className="my-progress__cell">
                    {
                      trainingDiaries
                        .filter((diary) => (new Date(diary.createdAt)).getDay() === WeekDayMap[weekDay])
                        .reduce((res, diary) => res + diary.caloriesCount, 0)
                    }
                  </td>
                ))
            }
          </tr>
          <tr className="my-progress__row">
            {
              Object.values(WeekDay)
                .slice((progressCurrentPage - 1) * 3, progressCurrentPage * MAX_PROGRESS_DASHBOARD_ITEMS_PER_PAGE)
                .map((weekDay) => {
                  const receivedCalories = foodDiaries
                    .filter((diary) => diary.weekDay === weekDay)
                    .reduce((res, diary) => res + diary.caloriesCount, 0);
                  const burnedCalories = trainingDiaries
                    .filter((diary) => (new Date(diary.createdAt)).getDay() === WeekDayMap[weekDay])
                    .reduce((res, diary) => res + diary.caloriesCount, 0);
                  const caloriesBalance = receivedCalories - burnedCalories;
                  return (
                    <td
                      key={nanoid()}
                      className={`
                      my-progress__cell
                      ${caloriesBalance < 0 ? 'my-progress__cell--green' : 'my-progress__cell--red'}
                    `}
                    >
                      {Math.abs(caloriesBalance)}
                    </td>
                  );
                })
            }
          </tr>
        </table>
      </div>
    </section>
  );
}

export default MyProgress;
