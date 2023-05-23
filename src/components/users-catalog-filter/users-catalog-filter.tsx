import {useEffect, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {fetchUsersCatalogAction} from '../../store/api-actions';
import {SubwayStation} from '../../types/subway-station.enum';
import {nanoid} from 'nanoid';
import {FILTER_QUERY_DELAY, MAX_LOCATION_TYPES_COUNT_PER_PAGE, MAX_TRAINING_TYPES_COUNT_PER_PAGE} from '../../const';
import {TrainingType} from '../../types/training-type.enum';
import {debounce} from '../../helpers';
import {TrainingLevel} from '../../types/training-level.enum';
import {UserRole} from '../../types/user-role.enum';

function UsersCatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const [currentLocationTypesPage, setCurentLocationTypesPage] = useState(1);
  const locationTypesPagesCount = Math.ceil(Object.values(SubwayStation).length / MAX_LOCATION_TYPES_COUNT_PER_PAGE);

  const [currentTrainingTypesPage, setCurentTrainingTypesPage] = useState(1);
  const trainingTypesPagesCount = Math.ceil(Object.values(TrainingType).length / MAX_TRAINING_TYPES_COUNT_PER_PAGE);

  const [locationValue, setLocationValue] = useState<SubwayStation[]>([]);
  const [trainingType, setTrainingType] = useState<TrainingType[]>([]);

  const [locationFilter, setLocationFilter] = useState<SubwayStation[]>([]);
  const [trainingTypeFilter, setTrainingTypeFilter] = useState<TrainingType[]>([]);
  const [trainingLevelFilter, setTrainingLevelFilter] = useState<TrainingLevel>();
  const [userRoleFilter, setUserRoleFilter] = useState<UserRole>();

  const setLocationFilterDebounced = debounce<(prevState: SubwayStation[]) => SubwayStation[]>((arg) => setLocationFilter(arg), FILTER_QUERY_DELAY);
  const setTrainingTypeFilterDebounced = debounce<(prevState: TrainingType[]) => TrainingType[]>((arg) => setTrainingTypeFilter(arg), FILTER_QUERY_DELAY);

  useEffect(() => {
    dispatch(fetchUsersCatalogAction({
      location: locationFilter.join(','),
      trainingTypes: trainingTypeFilter.join(','),
      trainingLevel: trainingLevelFilter,
      userRole: userRoleFilter,
    }));
  }, [dispatch, locationFilter, trainingLevelFilter, trainingTypeFilter, userRoleFilter]);

  const handleShowMoreLocationsButtonClick = () => {
    if (currentLocationTypesPage < locationTypesPagesCount) {
      setCurentLocationTypesPage((prevState) => prevState + 1);
    }
  };

  const handleShowMoreTrainingTypesButtonClick = () => {
    if (currentTrainingTypesPage < trainingTypesPagesCount) {
      setCurentTrainingTypesPage((prevState) => prevState + 1);
    }
  };

  const handleLocationInputChange = (option: SubwayStation) => {
    if (locationFilter.includes(option)) {
      setLocationValue((prevState) => prevState.filter((location) => location !== option));
      setLocationFilterDebounced((prevState) => prevState.filter((durationValue) => durationValue !== option));
    } else {
      setLocationValue((prevState) => [...prevState, option]);
      setLocationFilterDebounced((prevState) => [...prevState, option]);
    }
  };

  const handleTrainingTypeInputChange = (option: TrainingType) => {
    if (trainingTypeFilter.includes(option)) {
      setTrainingType((prevState) => prevState.filter((type) => type !== option));
      setTrainingTypeFilterDebounced((prevState) => prevState.filter((durationValue) => durationValue !== option));
    } else {
      setTrainingType((prevState) => [...prevState, option]);
      setTrainingTypeFilterDebounced((prevState) => [...prevState, option]);
    }
  };

  const handleTrainingLevelInputChange = (level: TrainingLevel) => {
    setTrainingLevelFilter(level);
  };

  return (
    <form className="user-catalog-form__form" data-testid="users-catalog-filter">
      <div className="user-catalog-form__block user-catalog-form__block--location">
        <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
        <ul className="user-catalog-form__check-list">
          {
            Object.values(SubwayStation).slice(0, currentLocationTypesPage * MAX_LOCATION_TYPES_COUNT_PER_PAGE).map((location) => (
              <li key={nanoid()} className="user-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      onChange={() => handleLocationInputChange(location)}
                      type="checkbox" value="user-agreement-1" name="user-agreement"
                      checked={locationValue.includes(location)}
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      {location}
                    </span>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
        {
          currentLocationTypesPage < locationTypesPagesCount
            && (
              <button
                onClick={handleShowMoreLocationsButtonClick}
                className="btn-show-more user-catalog-form__btn-show" type="button"
              >
                <span>Посмотреть все</span>
                <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                  <use xlinkHref="#arrow-down"></use>
                </svg>
              </button>
            )
        }
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--spezialization">
        <h4 className="user-catalog-form__block-title">Специализация</h4>
        <ul className="user-catalog-form__check-list">
          {
            Object.values(TrainingType).slice(0, currentTrainingTypesPage * MAX_TRAINING_TYPES_COUNT_PER_PAGE).map((option) => (
              <li key={nanoid()} className="user-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      onChange={() => handleTrainingTypeInputChange(option)}
                      checked={trainingType.includes(option)}
                      type="checkbox" value="spezialization-1" name="spezialization"
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      {option}
                    </span>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
        {
          currentTrainingTypesPage < trainingTypesPagesCount
            && (
              <button
                onClick={handleShowMoreTrainingTypesButtonClick}
                className="btn-show-more user-catalog-form__btn-show" type="button"
              >
                <span>Посмотреть все</span>
                <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                  <use xlinkHref="#arrow-down"></use>
                </svg>
              </button>
            )
        }
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--level">
        <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
        <div className="custom-toggle-radio">
          {
            Object.values(TrainingLevel).map((level) => (
              <div key={level} className="custom-toggle-radio__block">
                <label>
                  <input
                    onChange={() => handleTrainingLevelInputChange(level)}
                    type="radio" name="user-agreement"
                    checked={trainingLevelFilter === level}
                  />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">
                    {level.split('').map((item, index) => index === 0 ? item.toUpperCase() : item)}
                  </span>
                </label>
              </div>
            ))
          }
        </div>
      </div>
      <div className="user-catalog-form__block">
        <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
        <div className="btn-radio-sort">
          <label>
            <input
              onChange={() => setUserRoleFilter(UserRole.Coach)}
              type="radio" name="sort"
            />
            <span className="btn-radio-sort__label">Тренеры</span>
          </label>
          <label>
            <input
              onChange={() => setUserRoleFilter(UserRole.User)}
              type="radio" name="sort"
            />
            <span className="btn-radio-sort__label">Пользователи</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default UsersCatalogFilter;
