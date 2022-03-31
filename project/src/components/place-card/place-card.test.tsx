import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { cities } from '../../mocks/fake-cities';
import { makeFakeOffer } from '../../mocks/fake-offer';
import PlaceCard from './place-card';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {
    cities: cities,
    currentOffer: null,
  },
});

const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  it('should render FavoritesList correctly', () => {
    history.push(AppRoute.Root);
    const offer = makeFakeOffer();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard offer={offer} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });

  it('should call function onListItemHover when hover on article', () => {
    history.push(AppRoute.Root);
    const offer = makeFakeOffer();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard
            offer={offer}
          />
        </HistoryRouter>
      </Provider>);

    userEvent.hover(screen.getByTestId('article-item'));

    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
