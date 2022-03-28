import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/data/data';
import {
  Offers
} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PropsType = {
  favoriteOffers: Offers;
  city: string;
}

function FavoritesListItem({favoriteOffers, city}: PropsType): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <li key={favoriteOffers[0].id + city} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={AppRoute.Root}
            onClick={() => {dispatch(changeCity(city));}}
          >
            <span>{city}</span>
          </Link>
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
