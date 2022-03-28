import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { cities } from '../../mocks/cities';
import HistoryRouter from '../history-router/history-router';
import MainEmpty from './main-empty';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    currentCity: cities[0],
  },
});

const history = createMemoryHistory();

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Root);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainEmpty />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
  });
});
