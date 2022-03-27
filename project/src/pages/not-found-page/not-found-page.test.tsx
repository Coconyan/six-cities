import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { cities } from '../../mocks/cities';
import NotFoundPage from './not-found-page';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: { currentCity: cities[0] },
});

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundPage />
        </HistoryRouter>
      </Provider>,
    );

    const headerElement = screen.getByText('404 Not Found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
