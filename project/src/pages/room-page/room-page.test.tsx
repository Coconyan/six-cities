import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeOffer } from '../../mocks/fake-offer';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute } from '../../const';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    currentOffer: makeFakeOffer(),
    currentOffersNearby: [makeFakeOffer()],
    currentOfferComments: [makeFakeOffer()],
  },
});

const history = createMemoryHistory();

describe('Component: RoomPage', () => {
  it('should render RoomPage correctly', () => {
    history.push(`${AppRoute.Room}/1`);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1>Mock Room Page</h1>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Mock Room Page/i)).toBeInTheDocument();
  });
});
