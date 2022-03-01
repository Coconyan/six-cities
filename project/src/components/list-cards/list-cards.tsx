import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PropsType = {
  offers: Offer[];
  onListItemHover?: (listItemName: string) => void;
  placeCardClass?: string;
  placeCardImageClass?: string;
}

function ListCards({offers, onListItemHover, placeCardClass, placeCardImageClass}: PropsType): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onListItemHover={onListItemHover}
          placeCardClass={placeCardClass}
          placeCardImageClass={placeCardImageClass}
        />
      ))}
    </>
  );
}

export default ListCards;
