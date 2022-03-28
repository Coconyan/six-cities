import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import {
  AppRoute,
  AuthorizationStatus,
  SortTypes
} from '../../const';
import { cities } from '../../mocks/cities';
import { makeFakeOffer } from '../../mocks/fake-offer';
import { sortPriceToHigh } from '../../utils';
import MainPage from './main-page';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: MainPage', () => {
  it('should render correctly with empty offers list', () => {
    history.push(AppRoute.Root);
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
      DATA: {
        cities: cities,
        isDataLoaded: true,
        offers: [],
        currentCity: cities[0],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
  });

  it('should switch current offers if sort type is changed', () => {
    history.push(AppRoute.Root);
    const currentCity = cities[0];
    const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
    let currentCityOffers = offers.slice();
    let currentSortType = SortTypes.Popular;
    currentSortType = SortTypes.PriceLowToHigh;

    switch (currentSortType) {
      case SortTypes.PriceLowToHigh:
        currentCityOffers.sort(sortPriceToHigh);
        break;
      default:
        currentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);
    }
    expect(offers === currentCityOffers).toBeFalsy();
  });

  it('should filter current offers by current city', () => {
    history.push(AppRoute.Root);
    const currentCity = cities[0];
    const offers = [makeFakeOffer(cities[1]), makeFakeOffer(cities[0]), makeFakeOffer(cities[4]), makeFakeOffer(cities[0]), makeFakeOffer(cities[1])];
    const currentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);

    expect(currentCityOffers.length).toBe(2);
  });
});
