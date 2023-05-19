import {nanoid} from 'nanoid';
import SpecialForYouItem from '../special-for-you-item/special-for-you-item';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getDailyCaloriesCount, getDuration, getTrainingLevel, getTrainingTypes} from '../../store/user-data/selectors';
import {fetchRecommendedTrainingsAction} from '../../store/api-actions';
import {getRecommendedTrainings} from '../../store/training-data/selectors';
import {
  MAX_CALORIES_COUNT_COEFFICIENT,
  MAX_SLIDER_TRAININGS_COUNT,
  MAX_SLIDER_TRAININGS_PER_PAGE,
  MIN_CALORIES_COUNT_COEFFICIENT
} from '../../const';

function SpecialForYou(): JSX.Element {
  const dispatch = useAppDispatch();

  const userTrainingTypes = useAppSelector(getTrainingTypes);
  const userDuration = useAppSelector(getDuration);
  const userTrainingLevel = useAppSelector(getTrainingLevel);
  const userDailyCaloriesCount = useAppSelector(getDailyCaloriesCount);
  const specialForYouTrainings = useAppSelector(getRecommendedTrainings);

  const [trainingsCurrentPage, setTrainingsCurrentPage] = useState(1);

  useEffect(() => {
    if (userDuration && userTrainingTypes && userTrainingLevel && userDailyCaloriesCount) {
      dispatch(fetchRecommendedTrainingsAction({
        trainingType: userTrainingTypes.join(','),
        duration: userDuration,
        trainingLevel: userTrainingLevel,
        minCaloriesCount: userDailyCaloriesCount * MIN_CALORIES_COUNT_COEFFICIENT,
        maxCaloriesCount: userDailyCaloriesCount * MAX_CALORIES_COUNT_COEFFICIENT,
        limit: MAX_SLIDER_TRAININGS_COUNT
      }));
    }
  }, [dispatch, userDailyCaloriesCount, userDuration, userTrainingLevel, userTrainingTypes]);

  const handleBackArrowButtonClick = () => {
    setTrainingsCurrentPage((prevState) => prevState > 1 ? prevState - 1 : prevState);
  };

  const handleNextArrowButtonClick = () => {
    setTrainingsCurrentPage((prevState) => trainingsCurrentPage < MAX_SLIDER_TRAININGS_COUNT / MAX_SLIDER_TRAININGS_PER_PAGE ? prevState + 1 : prevState);
  };

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button
                onClick={handleBackArrowButtonClick}
                className="btn-icon special-for-you__control" type="button" aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                onClick={handleNextArrowButtonClick}
                className="btn-icon special-for-you__control" type="button" aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            {
              specialForYouTrainings.slice((trainingsCurrentPage - 1) * MAX_SLIDER_TRAININGS_PER_PAGE, trainingsCurrentPage * MAX_SLIDER_TRAININGS_PER_PAGE).map((training) => (
                <SpecialForYouItem key={nanoid()} training={training}/>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SpecialForYou;
