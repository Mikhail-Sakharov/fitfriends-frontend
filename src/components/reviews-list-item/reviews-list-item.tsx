import {FF_USERS_URL} from '../../const';
import {ReviewRdo} from '../../types/review.rdo';

type ReviewsListItemProps = {
  review: ReviewRdo;
};

function ReviewsListItem({review}: ReviewsListItemProps): JSX.Element {
  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              <img src={`${FF_USERS_URL}/${review.userAvatarPath}`} width="64" height="64" alt="Изображение пользователя"/>
            </picture>
          </div>
          <span className="review__user-name">
            {review.userName}
          </span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span>
              {review.rating}
            </span>
          </div>
        </div>
        <p className="review__comment">
          {review.text}
        </p>
      </div>
    </li>
  );
}

export default ReviewsListItem;
