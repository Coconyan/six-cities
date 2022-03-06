import { useState } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import ListCards from '../../components/list-cards/list-cards';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';

function MainPage(): JSX.Element {
  const {currentCity, offers} = useAppSelector((state) => state);
  const currentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  const [activeCard, setActiveCard] = useState<Offer | undefined>(
    undefined,
  );

  const onListItemHover = (id: string) => {
    const currentOffer = offers.find((offer) => String(offer.id) === id);

    setActiveCard(currentOffer);
  };

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
              <b className="places__found">{`${currentCityOffers.length} places to stay in ${currentCity.name}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {<ListCards offers={currentCityOffers} onListItemHover={onListItemHover}/>}
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
