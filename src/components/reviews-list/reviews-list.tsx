import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getUserRole} from '../../store/auth-process/selectors';
import {TrainingRdo} from '../../types/training.rdo';
import {UserRole} from '../../types/user-role.enum';
import ReviewsListItem from '../reviews-list-item/reviews-list-item';
import {getReviews} from '../../store/training-data/selectors';
import {fetchReviewsAction} from '../../store/api-actions';
import {nanoid} from 'nanoid';

type ReviewsListProps = {
  training: TrainingRdo | null;
};

function ReviewsList({training}: ReviewsListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(getUserRole);
  const reviews = useAppSelector(getReviews);

  useEffect(() => {
    if (training) {
      dispatch(fetchReviewsAction(training.id));
    }
  }, [dispatch, training]);

  return (
    <aside className="reviews-side-bar">
      <button
        onClick={() => window.history.back()}
        className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button"
      >
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
        <span>Назад</span>
      </button>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {
          reviews
            && reviews.map((review) => (
              <ReviewsListItem key={nanoid()} review={review}/>
            ))
        }
      </ul>
      <button className="btn btn--medium reviews-side-bar__button" type="button" disabled={userRole === UserRole.Coach}>Оставить отзыв</button>
    </aside>
  );
}

export default ReviewsList;
