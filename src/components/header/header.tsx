import {Link} from 'react-router-dom';
import {dropTokens} from '../../services/tokens';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchNotificationsAction} from '../../store/api-actions';
import {getNotifications} from '../../store/user-data/selectors';
import {nanoid} from 'nanoid';
import {getNotificationDate} from '../../helpers';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(getNotifications);

  // Временно. Удалить!
  //-------------------------------------------------------
  const handleExitButtonClick = () => {
    dropTokens();
  };
  //-------------------------------------------------------

  useEffect(() => {
    dispatch(fetchNotificationsAction());
  }, [dispatch]);

  return (
    <header className="header">
      <div className="container">
        <span className="header__logo">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link is-active" to="#" aria-label="На главную">
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#" aria-label="Личный кабинет">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to="#" aria-label="Друзья">
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item main-nav__item--notifications">
              <Link className="main-nav__link" to="#" aria-label="Уведомления">
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg>
              </Link>
              <div className="main-nav__dropdown">
                <p className="main-nav__label">Оповещения</p>
                <ul className="main-nav__sublist">
                  {
                    notifications.map((notification) => (
                      <li key={nanoid()} className="main-nav__subitem">
                        <Link className="notification is-active" to="#">
                          <p className="notification__text">
                            {notification.text}
                          </p>
                          <time className="notification__time" dateTime="2023-12-23 12:35">
                            {getNotificationDate(notification.createdAt)}
                          </time>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </li>
            <li
              onClick={handleExitButtonClick}
              className="main-nav__item"
            >
              <Link className="main-nav__link" to="#" aria-label="Выход (временно, удалить)">
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-wallet"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search"/>
              <svg className="search__icon" width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item">
                <Link className="search__link" to="#">Бокс</Link>
              </li>
              <li className="search__item">
                <Link className="search__link is-active" to="#">Бег</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Аэробика</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">Text</Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
