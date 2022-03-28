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
import FavoritesList from './favorites-list';
import { makeFakeOffer } from '../../mocks/fake-offer';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    cities: cities,
  },
});

const history = createMemoryHistory();

describe('Component: FavoritesList', () => {
  it('should render FavoritesList correctly', () => {
    history.push(AppRoute.Favorites);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesList favoriteOffers={[makeFakeOffer(), makeFakeOffer(), makeFakeOffer()]} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
  });

  it('when user click any City should redirect', () => {
    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<FavoritesList favoriteOffers={[makeFakeOffer(), makeFakeOffer(), makeFakeOffer()]}/>}
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
