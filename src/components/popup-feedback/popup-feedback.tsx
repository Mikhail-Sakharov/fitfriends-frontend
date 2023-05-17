import {nanoid} from 'nanoid';
import {ChangeEvent, useEffect, useState} from 'react';
import {RATING_VALUES, ReviewTextLength} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setDataLoadedStatus} from '../../store/app-data/app-data';
import {getAvatar} from '../../store/user-data/selectors';
import {createReviewAction, fetchReviewsAction} from '../../store/api-actions';

type PopupFeedbackProps = {
  trainingId: string | undefined;
  setPopupOpened: (state: boolean) => void;
};

function PopupFeedback({trainingId, setPopupOpened}: PopupFeedbackProps): JSX.Element {
  const dispatch = useAppDispatch();

  const userAvatarPath = useAppSelector(getAvatar);

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const [reviewTextInputUsed, setReviewTextInputUsed] = useState(false);
  const [reviewTextError, setReviewTextError] = useState('Заполните поле');

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (reviewTextError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [reviewTextError]);

  const handleRaitingInputChange = (value: number) => {
    setRating(value);
    setReviewTextInputUsed(true);
  };

  const handleReviewTextInputChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const value = evt.currentTarget.value;
    setReviewText(value);
    if (value.length < ReviewTextLength.MIN || value.length > ReviewTextLength.MAX) {
      setReviewTextError(`Длина комментария от ${ReviewTextLength.MIN} до ${ReviewTextLength.MAX} символов`);
      if (!value) {
        setReviewTextError('Заполните поле');
      }
    } else {
      setReviewTextError('');
    }
  };

  const createReview = async () => {
    if (formValid && trainingId) {
      dispatch(setDataLoadedStatus(true));
      await dispatch(createReviewAction({
        trainingId,
        text: reviewText,
        userAvatarPath,
        rating
      }));
      await dispatch(fetchReviewsAction(trainingId));
      dispatch(setDataLoadedStatus(false));
    }
  };

  const handleGoNextButtonClick = () => {
    createReview();
  };

  return (
    <main>
      <div className="popup-form popup-form--feedback">
        <section className="popup">
          <div className="popup__wrapper">
            <div className="popup-head">
              <h2 className="popup-head__header">Оставить отзыв</h2>
              <button
                onClick={() => setPopupOpened(false)}
                className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close"
              >
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div className="popup__content popup__content--feedback">
              <h3 className="popup__feedback-title">Оцените тренировку</h3>
              <ul className="popup__rate-list">
                {
                  RATING_VALUES.map((value) => (
                    <li key={nanoid()} className="popup__rate-item">
                      <div className="popup__rate-item-wrap">
                        <label>
                          <input
                            onChange={() => handleRaitingInputChange(value)}
                            type="radio" name="оценка тренировки" aria-label={`оценка ${value}.`} value={value}
                            checked={rating === value}
                          />
                          <span className="popup__rate-number">
                            {value}
                          </span>
                        </label>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className="popup__feedback">
                <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
                <div className="popup__feedback-textarea">
                  <div className="custom-textarea">
                    <label className={`${reviewTextInputUsed && reviewTextError ? 'custom-input--error' : ''}`}>
                      <textarea
                        className={`${reviewTextInputUsed && reviewTextError ? 'custom-textarea__error' : ''}`}
                        onChange={handleReviewTextInputChange}
                        name="description" placeholder=" "
                        value={reviewText}
                      >
                      </textarea>
                      <span className="custom-input__error">
                        {reviewTextInputUsed && reviewTextError}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="popup__button">
                <button
                  onClick={handleGoNextButtonClick}
                  className="btn" type="button"
                >
                  Продолжить
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PopupFeedback;
