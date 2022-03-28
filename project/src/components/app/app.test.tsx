import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {
  AuthorizationStatus,
  AppRoute
} from '../../const';
import { cities } from '../../mocks/cities';
import { makeFakeOffer } from '../../mocks/fake-offer';
import { makeFakeComment } from '../../mocks/fake-comment';
import {
  Route,
  Routes
} from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

const mockStore = configureMockStore();

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  DATA: {
    cities: cities,
    isDataLoaded: true,
    offers: [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()],
    currentCity: cities[0],
    currentOffer: makeFakeOffer(),
    currentOffersNearby: [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()],
    currentOfferComments: [makeFakeComment(), makeFakeComment()],
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<h1>Mock Main Page</h1>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <h1>Mock Favorite Page</h1>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<h1>Mock Room Page</h1>}
        >
          <Route path={`${AppRoute.Room}:id`} element={<h1>Mock Room Page</h1>} />
        </Route>
        <Route
          path={AppRoute.SignIn}
          element={<SignInPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Mock Main Page/i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Mock Favorite Page/i)).toBeInTheDocument();
  });

  it('should render "RoomPage" when user navigate to "/room/id"', () => {
    history.push(`${AppRoute.Room}/1`);

    render(fakeApp);

    expect(screen.getByText(/Mock Room Page/i)).toBeInTheDocument();
    // expect(screen.getByText(/What&apos;s inside/i)).toBeInTheDocument();
    // expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    // expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
