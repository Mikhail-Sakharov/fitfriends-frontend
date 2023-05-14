import {Link} from 'react-router-dom';

function MyTrainingPurchasesItem(): JSX.Element {
  return (
    <li className="my-purchases__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet="img/content/thumbnails/training-01.webp, img/content/thumbnails/training-01@2x.webp 2x"/>
              <img src="img/content/thumbnails/training-01.jpg" srcSet="img/content/thumbnails/training-01@2x.jpg 2x" width="330" height="190" alt=""/>
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">800</span>
            <span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">energy</h2>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#пилатес</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#320ккал</span>
                </div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="thumbnail-training__rate-value">4</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и&nbsp;координацию.</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to="#">Подробнее</Link>
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to="#">Отзывы</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MyTrainingPurchasesItem;
