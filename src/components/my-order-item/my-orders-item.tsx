import {Link} from 'react-router-dom';
import {OrderRdo} from '../../types/order.rdo';
import {nanoid} from 'nanoid';

type MyOrdersItemProps = {
  order: OrderRdo;
};

function MyOrdersItem({order}: MyOrdersItemProps): JSX.Element {

  const features = [
    `#${order.training.type}`,
    `#${order.training.caloriesCount}ккал`
  ];

  return (
    <li className="my-orders__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img src={order.training.bgImageUrl} width="330" height="190" alt="training thumbnail"/>
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">
              {order.training.price}
            </span>
            <span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">
            {order.training.title}
          </h2>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              {
                features.map((tag) => (
                  <li key={nanoid()} className="thumbnail-training__hashtags-item">
                    <div className="hashtag thumbnail-training__hashtag">
                      <span>
                        {tag}
                      </span>
                    </div>
                  </li>
                ))
              }
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="thumbnail-training__rate-value">
                {order.training.rating}
              </span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">
              {order.training.description}
            </p>
          </div>
          <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to="#">
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-info"></use>
            </svg>
            <span>Подробнее</span>
          </Link>
        </div>
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <use xlinkHref="#icon-chart"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">
              {order.statistics.totalSoldQuantity}
            </p>
            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <use xlinkHref="#icon-wallet"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">
              {order.statistics.totalSoldAmountOfMoney}
              <span>₽</span>
            </p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MyOrdersItem;
