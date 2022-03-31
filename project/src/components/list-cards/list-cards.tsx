import { Offers } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PropsType = {
  offers: Offers;
  placeCardClass?: string;
  placeCardImageClass?: string;
  isFavoritePage?: boolean;
  widthImage?: number;
  heightImage?: number;
  isMainPage?: boolean;
}

function ListCards({offers, placeCardClass, placeCardImageClass, isFavoritePage, widthImage, heightImage, isMainPage}: PropsType): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} placeCardClass={placeCardClass} placeCardImageClass={placeCardImageClass} isFavoritePage={isFavoritePage} isMainPage={isMainPage} widthImage={widthImage} heightImage={heightImage} />
      ))}
    </>
  );
}

export default ListCards;
