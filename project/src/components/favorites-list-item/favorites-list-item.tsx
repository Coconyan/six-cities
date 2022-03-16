import { Offers } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PropsType = {
  favoriteOffers: Offers;
  city: string;
}

function FavoritesListItem({favoriteOffers, city}: PropsType): JSX.Element {
  return (
    <li key={favoriteOffers[0].id + city} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#todo">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {favoriteOffers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            isFavoritePage
            placeCardClass='__card'
            placeCardImageClass='favorites'
            widthImage={150}
            heightImage={110}
          />
        ))}
      </div>
    </li>
  );
}

export default FavoritesListItem;
