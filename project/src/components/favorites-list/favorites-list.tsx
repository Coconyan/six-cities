import { useAppSelector } from '../../hooks';
import { Offers } from '../../types/offer';
import FavoritesListItem from '../favorites-list-item/favorites-list-item';

type PropsType = {
  favoriteOffers: Offers;
}

function FavoritesList({favoriteOffers}: PropsType): JSX.Element {
  const {cities} = useAppSelector(({DATA}) => DATA);
  const citiesArray = cities.map((city) => city.name);
  return (
    <ul className="favorites__list">
      {citiesArray.map((city) => (
        favoriteOffers.find((offer) => offer.city.name === city)
          ? <FavoritesListItem key={city} favoriteOffers={favoriteOffers.filter((offer) => offer.city.name === city)} city={city} />
          : ''
      ))}
    </ul>
  );
}

export default FavoritesList;
