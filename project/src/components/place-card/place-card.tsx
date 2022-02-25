//import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import firstLetterToUpperCase from '../../utils';
import PremiumCardMark from '../premium-card-mark/premium-card-mark';

type PropsType = {
  offer: Offer;
  onActiveCard: (offer: number) => void;
  activeCard: number;
}

function PlaceCard({offer, onActiveCard, activeCard}: PropsType): JSX.Element {
  const {previewImage, rating, price, title, type, isPremium, isFavorite, id} = offer;
  const favoriteClassName = `place-card__bookmark-button${isFavorite ? isFavorite && '--active button' : ' button'}`;
  return (
    <article
      className="cities__place-card place-card"
      id={String(id)}
      onMouseEnter={() => {
        onActiveCard(offer.id);
      }}
      onMouseLeave={() => {
        onActiveCard(0);
      }}
    >
      {isPremium ? <PremiumCardMark /> : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}/${id}`}>
          <img className="place-card__image" src={previewImage} width={260} height={200} alt={title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{`€${price}`}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={favoriteClassName} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20 }%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#todo">{title}</a>
        </h2>
        <p className="place-card__type">{firstLetterToUpperCase(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
