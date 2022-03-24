import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';

const mockStore = configureMockStore();

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  DATA: { isDataLoaded: true },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "RoomPage" when user navigate to "/room/id"', () => {
    history.push(`${AppRoute.Room}/1`);

    render(fakeApp);

    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/What&apos;s inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
