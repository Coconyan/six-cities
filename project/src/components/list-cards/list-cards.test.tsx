import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { cities } from '../../mocks/cities';
import { makeFakeOffer } from '../../mocks/fake-offer';
import ListCards from './list-cards';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    currentCity: cities[0],
  },
});

const history = createMemoryHistory();

describe('Component: ListCards', () => {
  it('should render ListCards correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ListCards
            offers={[makeFakeOffer()]}
          />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
