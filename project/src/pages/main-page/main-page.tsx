import { useState } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import ListCards from '../../components/list-cards/list-cards';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import { SortTypes } from '../../const';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import {
  sortPriceToHigh,
  sortPriceToLow,
  sortRatingToHigh
} from '../../utils';
import { SpinnerCircular } from 'spinners-react';
const SPINNER_COLOR = '#4481c3';

function MainPage(): JSX.Element {
  const {currentCity, offers, currentSortType, isDataLoaded} = useAppSelector((state) => state);
  let currentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  const [activeCard, setActiveCard] = useState<Offer | undefined>(
    undefined,
  );

  const onListItemHover = (id: string) => {
    const currentOffer = offers.find((offer) => String(offer.id) === id);
    setActiveCard(currentOffer);
  };

  switch (currentSortType) {
    case SortTypes.PriceLowToHigh:
      currentCityOffers.sort(sortPriceToHigh);
      break;
    case SortTypes.PriceHighToLow:
      currentCityOffers.sort(sortPriceToLow);
      break;
    case SortTypes.RatingLowToHigh:
      currentCityOffers.sort(sortRatingToHigh);
      break;
    case SortTypes.Popular:
      break;
    default:
      currentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo isMain />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#todo">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#todo">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <CitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{isDataLoaded ? `${currentCityOffers.length} places to stay in ${currentCity.name}` : 'Loading...'}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <Sort />
              </form>
              <div className="cities__places-list places__list tabs__content">
                {isDataLoaded ? <ListCards offers={currentCityOffers} onListItemHover={onListItemHover}/> : <SpinnerCircular color={SPINNER_COLOR}/>}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" >
                {
                  <Map
                    key={JSON.stringify(currentCity.location.longitude + currentCity.location.latitude)}
                    city={currentCity}
                    offers={currentCityOffers}
                    activeCard={activeCard}
                  />
                }
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
