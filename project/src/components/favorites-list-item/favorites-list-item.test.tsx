import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import { cities } from '../../mocks/cities';
import userEvent from '@testing-library/user-event';
import {
  Route,
  Routes
} from 'react-router-dom';
import { makeFakeOffer } from '../../mocks/fake-offer';
import FavoritesListItem from './favorites-list-item';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    cities: cities,
  },
});


const history = createMemoryHistory();

describe('Component: FavoritesListItem', () => {
  it('should render FavoritesListItem correctly', () => {
    history.push(AppRoute.Favorites);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesListItem favoriteOffers={[makeFakeOffer(), makeFakeOffer(), makeFakeOffer()]} city={cities[0]} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(cities[0].name)).toBeInTheDocument();
  });

  it('when user click City should redirect', () => {
    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<FavoritesListItem favoriteOffers={[makeFakeOffer(), makeFakeOffer(), makeFakeOffer()]} city={cities[0]} />}
            />
            <Route
              path={AppRoute.Root}
              element={<h1>Mock Main Page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Paris/i));

    expect(screen.getByText(/Mock Main Page/i)).toBeInTheDocument();
  });
});
