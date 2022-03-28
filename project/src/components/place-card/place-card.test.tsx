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
import { makeFakeOffer } from '../../mocks/fake-offer';
import PlaceCard from './place-card';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    cities: cities,
  },
});

const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  it('should render FavoritesList correctly', () => {
    history.push(AppRoute.Root);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard offer={makeFakeOffer()} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });

  it('should call function onListItemHover when hover on article', () => {
    history.push(AppRoute.Root);
    const onListItemHover = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard
            offer={makeFakeOffer()}
            onListItemHover={onListItemHover}
          />
        </HistoryRouter>
      </Provider>);

    userEvent.hover(screen.getByTestId('article-item'));

    expect(onListItemHover).toBeCalled();
    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
