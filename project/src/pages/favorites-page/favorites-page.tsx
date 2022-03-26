import { useEffect } from 'react';
import { SpinnerCircular } from 'spinners-react';
import FavoritesList from '../../components/favorites-list/favorites-list';
import HeaderLoginInfo from '../../components/header-login-info/header-login-info';
import Logo from '../../components/logo/logo';
import { SPINNER_COLOR } from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { fetchFavoriteOffers } from '../../store/api-actions';
import { getFavoriteOffers } from '../../store/data/selectors';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  if (!favoriteOffers) {
    return <SpinnerCircular color={SPINNER_COLOR} />;
  }

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
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList favoriteOffers={favoriteOffers}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
