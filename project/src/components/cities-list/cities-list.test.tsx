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
import CitiesList from './cities-list';
import userEvent from '@testing-library/user-event';
import {
  Route,
  Routes
} from 'react-router-dom';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    cities: cities,
    currentCity: cities[0],
  },
});

const history = createMemoryHistory();

describe('Component: Cities', () => {
  it('should render Cities correctly', () => {
    history.push(AppRoute.Root);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('when user click any City should redirect', () => {
    history.push(AppRoute.Room);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Room}
              element={<CitiesList />}
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
