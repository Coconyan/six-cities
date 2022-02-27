import { useState } from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PropsType = {
  offers: Offer[];
}

function ListCards({offers}: PropsType): JSX.Element {
  const [activeCard, setActiveCard] = useState(0);
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onActiveCard={(value) => {
            setActiveCard(value);
          }}
          activeCard={activeCard}
        />
      ))}
    </>
  );
}

export default ListCards;
