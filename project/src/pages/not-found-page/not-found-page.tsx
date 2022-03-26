import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';
import { getCurrentCity } from '../../store/data/selectors';

function NotFoundPage(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo isMain={false} />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">404 Not Found</h1>
            <Link to="/">Вернуться на главную</Link>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/">
                <span>{currentCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
