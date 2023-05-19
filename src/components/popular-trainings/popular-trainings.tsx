import {useNavigate} from 'react-router-dom';
import {AppRoute, MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE} from '../../const';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchTrainingCatalogAction} from '../../store/api-actions';
import {getFilteredTrainingCatalog} from '../../store/training-data/selectors';
import {SortType} from '../../types/sort.type';
import {SortOrder} from '../../types/sort-order';
import TrainingThumbnail from '../training-thumbnail/training-thumbnail';
import {nanoid} from 'nanoid';

function PopularTrainings(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const popularTrainings = useAppSelector(getFilteredTrainingCatalog);

  const [trainingsCurrentPage, setTrainingsCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTrainingCatalogAction({
      sortType: SortType.Rating,
      sortOrder: SortOrder.Desc,
      minRating: 4
    }));
  }, [dispatch]);

  const handleBackArrowButtonClick = () => {
    setTrainingsCurrentPage((prevState) => prevState > 1 ? prevState - 1 : prevState);
  };

  const handleNextArrowButtonClick = () => {
    const currentSliderLength = popularTrainings.slice((trainingsCurrentPage - 1) * MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE, trainingsCurrentPage * MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE).length;
    setTrainingsCurrentPage((prevState) => currentSliderLength < MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE || currentSliderLength === popularTrainings.length ? prevState : prevState + 1);
  };

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              onClick={() => navigate(AppRoute.TrainingCatalog)}
              className="btn-flat popular-trainings__button" type="button"
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                onClick={handleBackArrowButtonClick}
                className="btn-icon popular-trainings__control" type="button" aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                onClick={handleNextArrowButtonClick}
                className="btn-icon popular-trainings__control" type="button" aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            {
              popularTrainings.slice((trainingsCurrentPage - 1) * MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE, trainingsCurrentPage * MAX_SLIDER_POPULAR_TRAININGS_PER_PAGE).map((training) => (
                <li key={nanoid()} className="popular-trainings__item">
                  <TrainingThumbnail training={training}/>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
