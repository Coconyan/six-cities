import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { Offers } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PropsType = {
  offers: Offers;
  onListItemHover?: (listItemName: string) => void;
  placeCardClass?: string;
  placeCardImageClass?: string;
  isFavoritePage?: boolean;
  widthImage?: number;
  heightImage?: number;
}

function ListCards({offers, onListItemHover, placeCardClass, placeCardImageClass, isFavoritePage, widthImage, heightImage}: PropsType): JSX.Element {
  const {currentCity} = useAppSelector(({DATA}) => DATA);
  return (
    <>
      {offers.map((offer) => (
        offer.city.name === currentCity.name
          ? <PlaceCard key={offer.id} offer={offer} onListItemHover={onListItemHover} placeCardClass={placeCardClass} placeCardImageClass={placeCardImageClass} isFavoritePage={isFavoritePage} widthImage={widthImage} heightImage={heightImage} />
          : ''
      ))}
    </>
  );
}

export default memo(ListCards);
