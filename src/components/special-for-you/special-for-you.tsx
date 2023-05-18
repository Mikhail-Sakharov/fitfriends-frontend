import {nanoid} from 'nanoid';
import SpecialForYouItem from '../special-for-you-item/special-for-you-item';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getTrainingTypes} from '../../store/user-data/selectors';
import {fetchTrainingCatalogAction} from '../../store/api-actions';
import {getFilteredTrainingCatalog} from '../../store/training-data/selectors';
import {MAX_SLIDER_TRAININGS_COUNT, MAX_SLIDER_TRAININGS_PER_PAGE} from '../../const';

function SpecialForYou(): JSX.Element {
  const dispatch = useAppDispatch();

  const userTrainingTypes = useAppSelector(getTrainingTypes);
  const specialForYouTrainings = useAppSelector(getFilteredTrainingCatalog);

  const [trainingsCurrentPage, setTrainingsCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTrainingCatalogAction({
      trainingType: userTrainingTypes.join(','),
      // продолжительность
      // уровень
      // калории
      limit: MAX_SLIDER_TRAININGS_COUNT
    }));
  }, [dispatch, userTrainingTypes]);

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
