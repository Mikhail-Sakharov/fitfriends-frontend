import Header from '../../components/header/header';
import {useAppSelector} from '../../hooks';
import {useState} from 'react';
import {nanoid} from 'nanoid';
import TrainingThumbnail from '../../components/training-thumbnail/training-thumbnail';
import {
  AppRoute,
  MAX_TRAININGS_COUNT_PER_PAGE} from '../../const';
import {useNavigate} from 'react-router-dom';
import TrainingsFilter from '../../components/trainings-filter/trainings-filter';
import {getCurrentRequestTrainings} from '../../store/training-data/selectors';

function MyTrainings(): JSX.Element {
  const navigate = useNavigate();

  const currentRequestTrainings = useAppSelector(getCurrentRequestTrainings);

  const [trainingsPage, setTrainingsPage] = useState(1);
  const pagesCount = Math.ceil(currentRequestTrainings.length / MAX_TRAININGS_COUNT_PER_PAGE);

  const handleShowMoreButtonClick = () => {
    setTrainingsPage((prevState) => prevState < pagesCount ? prevState + 1 : prevState);
  };

  const handleReturnToTopButtonClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <button
                    onClick={() => navigate(AppRoute.SignUpQuestionnaireCoach)}
                    className="btn-flat btn-flat--underlined my-training-form__btnback" type="button"
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                    <span>Назад</span>
                  </button>
                  <h3 className="my-training-form__title">фильтры</h3>
                  <TrainingsFilter />
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    {
                      currentRequestTrainings.slice(0, trainingsPage * MAX_TRAININGS_COUNT_PER_PAGE).map((training) => (
                        <li key={nanoid()} className="my-trainings__item">
                          <TrainingThumbnail training={training}/>
                        </li>
                      ))
                    }
                  </ul>
                  <div className="show-more my-trainings__show-more">
                    {
                      trainingsPage >= pagesCount
                        ? (
                          <button
                            onClick={handleReturnToTopButtonClick}
                            className={`btn show-more__button ${pagesCount <= 1 ? 'visually-hidden' : ''}`}
                            type="button"
                          >
                            Вернуться в начало
                          </button>
                        )
                        : (
                          <button
                            onClick={handleShowMoreButtonClick}
                            className="btn show-more__button show-more__button--more"
                            type="button"
                          >
                            Показать еще
                          </button>
                        )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default MyTrainings;
