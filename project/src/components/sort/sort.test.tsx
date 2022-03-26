import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { SortTypes } from '../../const';
import HistoryRouter from '../history-route/history-route';
import Sort from './sort';

const mockStore = configureMockStore();
const currentSortType = SortTypes.Popular;

const store = mockStore({
  DATA: { currentSortType: currentSortType },
});

const history = createMemoryHistory();

describe('Component: Star', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Sort />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByText(currentSortType)).toBeInTheDocument();
    expect(screen.getByText(SortTypes.PriceHighToLow)).toBeInTheDocument();
    expect(screen.getByText(SortTypes.PriceLowToHigh)).toBeInTheDocument();
    expect(screen.getByText(SortTypes.RatingLowToHigh)).toBeInTheDocument();
  });
});
