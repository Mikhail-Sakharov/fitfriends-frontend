import {useNavigate} from 'react-router-dom';
import Header from '../../components/header/header';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchTrainingDiariesAction} from '../../store/api-actions';
import {getTrainingDiaries} from '../../store/diaries-data/selectors';
import {nanoid} from 'nanoid';
import {WeekDay, WeekDayMap} from '../../types/week-day.enum';
import {TrainingsDiaryRdo} from '../../types/trainings-diary.rdo';

function TrainingDiary(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const trainingDiaries = useAppSelector(getTrainingDiaries);

  const trainingDiariesMap = new Map();
  const trainingIdsSet = new Set(trainingDiaries.map((trainingDiary) => trainingDiary.trainingId));

  trainingIdsSet.forEach((trainingId) => {
    trainingDiariesMap.set(trainingId, trainingDiaries.filter((trainingDiary) => trainingDiary.trainingId === trainingId));
  });

  const iterableDiaries = Object.fromEntries(trainingDiariesMap) as {[key: string]: TrainingsDiaryRdo[]};

  useEffect(() => {
    dispatch(fetchTrainingDiariesAction());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button
                onClick={() => navigate(AppRoute.PersonalAccountUser)}
                className="btn-flat inner-page__back" type="button"
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="training-diary">
                  <div className="training-diary__wrapper">
                    <h1 className="training-diary__title">Дневник тренировок</h1>
                    <div className="training-diary__block">
                      <div className="training-diary__sidebar">
                        <svg className="training-diary__icon" width="17" height="18" aria-hidden="true">
                          <use xlinkHref="#icon-ranking"></use>
                        </svg>
                        <ul className="training-diary__list">
                          {
                            Object.entries(iterableDiaries).map((entry) => (
                              <li key={nanoid()} className="training-diary__item">
                                <span>
                                  {entry[1][0].trainingTitle}
                                </span>
                                <ul className="training-diary__sublist">
                                  <li className="training-diary__subitem">
                                    <span>Калории, ккал</span>
                                  </li>
                                  <li className="training-diary__subitem">
                                    <span>Время, мин</span>
                                  </li>
                                </ul>
                              </li>
                            ))
                          }
                        </ul>
                        <div className="training-diary__total">
                          <p className="training-diary__total-label">Итого</p>
                          <ul className="training-diary__total-list">
                            <li className="training-diary__total-item">
                              <span>Калории, ккал</span>
                            </li>
                            <li className="training-diary__total-item">
                              <span>Время, мин</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="training-diary__content">
                        <table className="training-diary__table">
                          <tr className="training-diary__row training-diary__row--head">
                            <th className="training-diary__cell training-diary__cell--head">пн</th>
                            <th className="training-diary__cell training-diary__cell--head">вт</th>
                            <th className="training-diary__cell training-diary__cell--head">ср</th>
                            <th className="training-diary__cell training-diary__cell--head">чт</th>
                            <th className="training-diary__cell training-diary__cell--head">пт</th>
                            <th className="training-diary__cell training-diary__cell--head">сб</th>
                            <th className="training-diary__cell training-diary__cell--head">вс</th>
                          </tr>
                          {
                            Object.entries(iterableDiaries).map((entry) => (
                              <>
                                <tr key={nanoid()} className="training-diary__row">
                                  {
                                    Object.values(WeekDay).map((weekDay) => (
                                      <td key={nanoid()} className="training-diary__cell">
                                        <div className="training-diary__data">
                                          <span>
                                            {
                                              entry[1]
                                                .filter((item) => (new Date(item.createdAt)).getDay() === WeekDayMap[weekDay])
                                                .reduce((res, item) => res + item.caloriesCount, 0).toLocaleString()
                                            }
                                          </span>
                                        </div>
                                      </td>
                                    ))
                                  }
                                </tr>
                                <tr key={nanoid()} className="training-diary__row">
                                  {
                                    Object.values(WeekDay).map((weekDay) => (
                                      <td key={nanoid()} className="training-diary__cell">
                                        <div className="training-diary__data">
                                          <span>
                                            {
                                              entry[1]
                                                .filter((item) => (new Date(item.createdAt)).getDay() === WeekDayMap[weekDay])
                                                .reduce((res, item) => res + item.duration, 0).toLocaleString()
                                            }
                                          </span>
                                        </div>
                                      </td>
                                    ))
                                  }
                                </tr>
                              </>
                            ))
                          }
                          <tr className="training-diary__row">
                            {
                              Object.values(WeekDay).map((weekDay) => (
                                <td key={nanoid()} className="training-diary__cell">
                                  <div className="training-diary__data training-diary__data--total">
                                    <span>
                                      {
                                        Object.values(iterableDiaries)
                                          .reduce((res, diaryGroup) => res.concat(diaryGroup), [])
                                          .filter((diary) => (new Date(diary.createdAt)).getDay() === WeekDayMap[weekDay])
                                          .reduce((res, diary) => res + diary.caloriesCount, 0).toLocaleString()
                                      }
                                    </span>
                                  </div>
                                </td>
                              ))
                            }
                          </tr>
                          <tr className="training-diary__row">
                            {
                              Object.values(WeekDay).map((weekDay) => (
                                <td key={nanoid()} className="training-diary__cell">
                                  <div className="training-diary__data training-diary__data--total">
                                    <span>
                                      {
                                        Object.values(iterableDiaries)
                                          .reduce((res, diaryGroup) => res.concat(diaryGroup), [])
                                          .filter((diary) => (new Date(diary.createdAt)).getDay() === WeekDayMap[weekDay])
                                          .reduce((res, diary) => res + diary.duration, 0).toLocaleString()
                                      }
                                    </span>
                                  </div>
                                </td>
                              ))
                            }
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className="total training-diary__total-per-week">
                      <div className="total__title-wrapper">
                        <div className="total__title">Итого за неделю</div>
                        <svg className="total__icon" width="30" height="30" aria-hidden="true">
                          <use xlinkHref="#icon-chart-with-arrow"></use>
                        </svg>
                      </div>
                      <dl className="total__result">
                        <div className="total__item">
                          <dt className="total__label">Калории, ккал</dt>
                          <dd className="total__number">
                            {
                              Object.values(iterableDiaries)
                                .reduce((res, diaryGroup) => res.concat(diaryGroup), [])
                                .reduce((res, diary) => res + diary.caloriesCount, 0).toLocaleString()
                            }
                          </dd>
                        </div>
                        <div className="total__item">
                          <dt className="total__label">Время, мин</dt>
                          <dd className="total__number">
                            {
                              Object.values(iterableDiaries)
                                .reduce((res, diaryGroup) => res.concat(diaryGroup), [])
                                .reduce((res, diary) => res + diary.duration, 0).toLocaleString()
                            }
                          </dd>
                        </div>
                      </dl>
                    </div>
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

export default TrainingDiary;
