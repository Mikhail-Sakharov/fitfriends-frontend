import {SubwayStation} from '../../types/subway-station.enum';
import Map from '../map/map';

type PopupUserMapProps = {
  location: SubwayStation | undefined;
  userName: string | undefined;
  setPopupOpened: (prevState: boolean) => void;
};


function PopupUserMap({location, userName, setPopupOpened}: PopupUserMapProps): JSX.Element {
  return (
    <main>
      <div className="popup-form popup-form--map">
        <section className="popup">
          <div className="popup__wrapper popup__wrapper--map">
            <div className="popup-head popup-head--address">
              <h2 className="popup-head__header">
                {userName}
              </h2>
              <p className="popup-head__address">
                <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-location"></use>
                </svg>
                <span>
                  м.
                  {' '}
                  {location}
                </span>
              </p>
              <button
                onClick={() => setPopupOpened(false)}
                className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close"
              >
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div className="popup__content-map">
              <Map location={location}/>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PopupUserMap;
