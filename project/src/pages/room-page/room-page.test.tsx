import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeOffer } from '../../mocks/fake-offer';
import HistoryRouter from '../../components/history-route/history-route';
import RoomPage from './room-page';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    currentOffer: makeFakeOffer(),
    currentOffersNearby: [makeFakeOffer()],
    currentOffersComments: [makeFakeOffer()],
  },
});

const history = createMemoryHistory();

describe('Component: RoomPage', () => {
  it('should render RoomPage correctly', () => {
    const id = useAppSelector(({DATA}) => DATA.currentOffer?.id);
    history.push(`${AppRoute.Room}/${id}`);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RoomPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });
});
