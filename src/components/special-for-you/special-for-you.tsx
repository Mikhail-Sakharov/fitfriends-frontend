import {nanoid} from 'nanoid';
import SpecialForYouItem from '../special-for-you-item/special-for-you-item';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getTrainingTypes} from '../../store/user-data/selectors';
import {fetchTrainingCatalogAction} from '../../store/api-actions';
import {getFilteredTrainingCatalog} from '../../store/training-data/selectors';

function SpecialForYou(): JSX.Element {
  const dispatch = useAppDispatch();

  const userTrainingTypes = useAppSelector(getTrainingTypes);
  const specialForYouTrainings = useAppSelector(getFilteredTrainingCatalog);

  useEffect(() => {
    dispatch(fetchTrainingCatalogAction({
      trainingType: userTrainingTypes.join(','),
      // продолжительность
      // уровень
      // калории
      // слайдер содержит не более 9 карточек
      limit: 9
    }));
  }, [dispatch, userTrainingTypes]);

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button className="btn-icon special-for-you__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon special-for-you__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            {
              specialForYouTrainings.map((training) => (
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
