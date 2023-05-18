import {Link} from 'react-router-dom';
import {TrainingRdo} from '../../types/training.rdo';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {setCurrentTraining} from '../../store/training-data/training-data';
import {saveTrainingId} from '../../helpers';
import {fetchUserInfoAction} from '../../store/api-actions';

type SpecialForYouItemProps = {
  training: TrainingRdo;
};

function SpecialForYouItem({training}: SpecialForYouItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleToTrainingCardPageLinkClick = () => {
    dispatch(setCurrentTraining(training));
    saveTrainingId(training.id);
    dispatch(fetchUserInfoAction(training.coachId));
    window.scrollTo(0, 0);
  };

  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            {
              training && <img src={training.bgImageUrl} height="191" alt="training"/>
            }
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">
            {training.title}
          </h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link
              onClick={handleToTrainingCardPageLinkClick}
              className="btn btn--small thumbnail-preview__button" to={AppRoute.TrainingCard}
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SpecialForYouItem;
