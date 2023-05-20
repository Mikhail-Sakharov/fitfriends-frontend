import {useAppSelector} from '../../hooks';
import SpecialOffersItem from '../special-offers-item/special-offers-item';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';
import {getTrainingCatalog} from '../../store/training-data/selectors';
import {nanoid} from 'nanoid';
import {useState} from 'react';

/* export enum ActiveSliderPosition {
  First = 'first',
  Second = 'second',
  Third = 'third',
} */

function SpecialOffers(): JSX.Element {
  const specialOffers = useAppSelector(getTrainingCatalog).filter((training) => training.isSpecialOffer);

  const [activeSliderPosition, setActiveSliderPosition] = useState(0);

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            {
              specialOffers.map((offer, index) => (
                <li
                  key={nanoid()}
                  className={`special-offers__item ${index === activeSliderPosition ? 'is-active' : ''}`}
                >
                  <SpecialOffersItem
                    offer={offer}
                    activeSliderPosition={activeSliderPosition}
                    setActiveSliderPosition={setActiveSliderPosition}
                  />
                </li>
              ))
            }
          </ul>
          <ThumbnailSpecGym />
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
