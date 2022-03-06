import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { changeCity } from '../../store/actions';

function CitiesList(): JSX.Element {
  const {cities, currentCity} = useAppSelector((state) => state);
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => (
              <li
                key={city.name}
                className="locations__item"
                id={city.name}
                onClick={() => {store.dispatch(changeCity(city));}}
              >
                <Link
                  to={AppRoute.Root}
                  className={`locations__item-link tabs__item ${city.name === currentCity.name ? 'tabs__item--active' : ''}`}
                >
                  <span>{city.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>

  );
}

export default CitiesList;
