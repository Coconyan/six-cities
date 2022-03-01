import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PropsType = {
  offers: Offer[];
  onListItemHover: (listItemName: string) => void;
}

function ListCards({offers, onListItemHover}: PropsType): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onListItemHover={onListItemHover}
        />
      ))}
    </>
  );
}

export default ListCards;
