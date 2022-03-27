import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import {
  addOfferToFavorite,
  addOfferToFavoritePage,
  removeOfferFromFavorite,
  removeOfferFromFavoritePage
} from '../../store/api-actions';
import { Offer } from '../../types/offer';
import firstLetterToUpperCase from '../../utils';
import PremiumMark from '../premium-mark/premium-mark';

type PropsType = {
  offer: Offer;
  onListItemHover?: (listItemName: string) => void;
  placeCardClass?: string;
  placeCardImageClass?: string;
  isFavoritePage?: boolean;
  widthImage?: number;
  heightImage?: number;
}

function PlaceCard({offer, onListItemHover, placeCardClass = '__place-card', placeCardImageClass = 'cities', isFavoritePage = false, widthImage = 260, heightImage = 200}: PropsType): JSX.Element {
  const {previewImage, rating, price, title, type, isPremium, isFavorite, id} = offer;
  const favoriteClassName = `place-card__bookmark-button${isFavorite ? isFavorite && '--active button' : ' button'}`;
  const dispatch = useAppDispatch();

  const listItemHoverHandler = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onListItemHover && onListItemHover(event.currentTarget.id);
  };

  const onFavoriteClickHandler = () => {
    if (isFavoritePage) {
      isFavorite ? dispatch(removeOfferFromFavoritePage(id)) : dispatch(addOfferToFavoritePage(id));
    } else {
      isFavorite ? dispatch(removeOfferFromFavorite(id)) : dispatch(addOfferToFavorite(id));
    }
  };

  return (
    <article
      className={`${placeCardImageClass + placeCardClass} place-card`}
      id={String(id)}
      onMouseEnter={listItemHoverHandler}
      onMouseLeave={() => {
        onListItemHover && onListItemHover('0');
      }}
      data-testid='article-item'
    >
      {isPremium && <PremiumMark />}
      <div className={`${placeCardImageClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Room}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage} width={widthImage}
            height={heightImage}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${isFavoritePage && 'favorites__card-info'} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{`€${price}`}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button key={`${id  }favorite-button`} className={favoriteClassName} type="button" onClick={onFavoriteClickHandler}>
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
          <Link to={`${AppRoute.Room}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{firstLetterToUpperCase(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
