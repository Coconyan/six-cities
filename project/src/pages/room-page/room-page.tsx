import { useEffect } from 'react';
import {
  Navigate,
  useParams
} from 'react-router-dom';
import HeaderLoginInfo from '../../components/header-login-info/header-login-info';
import ListCards from '../../components/list-cards/list-cards';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import PremiumMark from '../../components/premium-mark/premium-mark';
import RoomReviewsList from '../../components/room-reviews-list/room-reviews-list';
import { AppRoute } from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import {
  fetchCurrentOffer,
  fetchCurrentOffersComments,
  fetchCurrentOffersNearby
} from '../../store/api-actions';
import firstLetterToUpperCase from '../../utils';

function RoomPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {currentOffer: offer, currentOffersNearby, currentOffersComments} = useAppSelector(({DATA}) => DATA);
  const {id} = useParams();

  useEffect(() => {
    if (offer === null || offer.id !== Number(id)) {
      dispatch(fetchCurrentOffer(Number(id)));
      dispatch(fetchCurrentOffersNearby(Number(id)));
      dispatch(fetchCurrentOffersComments(Number(id)));
    }
  }, [dispatch, id, offer, currentOffersNearby, currentOffersComments]);

  if (!offer) {
    return <Navigate to={AppRoute.Root} />;
  }

  const {city, title, isPremium, rating, type, bedrooms, maxAdults, price, isFavorite, host, description} = offer;
  const {name, isPro, avatarUrl} = host;
  const favoriteClassName = `property__bookmark-button${isFavorite ? isFavorite && ' property__bookmark-button--active button' : ' button'}`;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo isMain={false} />
            </div>
            <nav className="header__nav">
              <HeaderLoginInfo />
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.slice(0, 6).map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt={title} />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? <PremiumMark classMark='property__mark'/> : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={favoriteClassName} type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${rating * 20 }%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {firstLetterToUpperCase(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">{`€${price}`}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.slice(0, 6).map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  <span className="property__user-status">
                    {isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              {currentOffersComments !== null ? <RoomReviewsList comments={currentOffersComments}/> : ''}
            </div>
          </div>
          <section className="property__map map">
            {
              <Map
                key={offer.id}
                city={city}
                offers={currentOffersNearby !== null ? currentOffersNearby.slice(0, 3).concat(offer) : [offer]}
                height={'580px'}
                activeCard={offer}
              />
            }
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <ListCards
                offers={currentOffersNearby !== null ? currentOffersNearby.slice(0, 3) : [offer]}
                placeCardClass = '__card'
                placeCardImageClass = 'near-places'
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;
