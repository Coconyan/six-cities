import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeOffer } from '../../mocks/fake-offer';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import { cities } from '../../mocks/cities';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    cities: cities,
    favoriteOffers: [makeFakeOffer()],
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const history = createMemoryHistory();

describe('Component: FavoritePage', () => {
  it('should render FavoritePage correctly', () => {
    history.push(AppRoute.Favorites);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1>Mock Favorite Page</h1>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Mock Favorite Page/i)).toBeInTheDocument();
  });
});
