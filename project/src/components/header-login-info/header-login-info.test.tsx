import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import {
  Route,
  Routes
} from 'react-router-dom';
import HeaderLoginInfo from './header-login-info';

const mockStore = configureMockStore();


const history = createMemoryHistory();

describe('Component: HeaderLoginInfo', () => {
  it('should render HeaderLoginInfo correctly', () => {
    history.push(AppRoute.Root);
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderLoginInfo />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render HeaderLoginInfo correctly if user not authorized', () => {
    history.push(AppRoute.Root);
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderLoginInfo />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('when user click SignIn should redirect', () => {
    history.push(AppRoute.Root);
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<HeaderLoginInfo />}
            />
            <Route
              path={AppRoute.SignIn}
              element={<h1>Mock SignIn Page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Sign in/i));

    expect(screen.getByText(/Mock SignIn Page/i)).toBeInTheDocument();
  });
});
