import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getUserRole} from '../../store/auth-process/selectors';
import {TrainingRdo} from '../../types/training.rdo';
import {UserRole} from '../../types/user-role.enum';
import ReviewsListItem from '../reviews-list-item/reviews-list-item';
import {getReviews} from '../../store/training-data/selectors';
import {fetchMyPurchasesAction, fetchReviewsAction} from '../../store/api-actions';
import {nanoid} from 'nanoid';
import {getMyPurchases} from '../../store/user-data/selectors';
import {OrderRdo, OrderType} from '../../types/order.rdo';
import PopupFeedback from '../popup-feedback/popup-feedback';

type ReviewsListProps = {
  training: TrainingRdo | null;
};

function ReviewsList({training}: ReviewsListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const userRole = useAppSelector(getUserRole);
  const reviews = useAppSelector(getReviews);
  const myPurchases = useAppSelector(getMyPurchases);

  const [isPopupOpened, setPopupOpened] = useState(false);

  const isTrainingAlreadyInMyPurchases = training
    ? myPurchases
      .filter((purchase) => purchase.orderType === OrderType.Training)
      .find((purchase) => (purchase as OrderRdo).training.id === training.id)
    : false;
  const isLeaveReviewButtonDisabled = userRole === UserRole.Coach || !isTrainingAlreadyInMyPurchases;

  useEffect(() => {
    if (training) {
      dispatch(fetchReviewsAction(training.id));
    }
    dispatch(fetchMyPurchasesAction());
  }, [dispatch, training]);

  return (
    <>
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
          {reviews
          && reviews.map((review) => (
            <ReviewsListItem key={nanoid()} review={review} />
          ))}
        </ul>
        <button
          onClick={() => setPopupOpened(true)}
          className="btn btn--medium reviews-side-bar__button" type="button"
          disabled={isLeaveReviewButtonDisabled}
        >
          Оставить отзыв
        </button>
      </aside>
      {
        isPopupOpened
          && (
            <PopupFeedback setPopupOpened={setPopupOpened}/>
          )
      }
    </>
  );
}

export default ReviewsList;
