import {
  useRef,
  useEffect
} from 'react';
import {
  Icon,
  Marker
} from 'leaflet';
import {
  City,
  Offer
} from '../../types/offer';
import {
  URL_MARKER_DEFAULT,
  URL_MARKER_CURRENT,
  ICON_SIZE,
  ICON_ANCHOR
} from '../../const';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  activeCard?: Offer | undefined;
  height?: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_ANCHOR,
});

function Map(props: MapProps): JSX.Element {
  const {city, offers, activeCard, height = '1158px'} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            activeCard !== undefined && offer.id === activeCard.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, offers, activeCard]);

  return <div style={{height: height}} ref={mapRef} />;
}

export default Map;
