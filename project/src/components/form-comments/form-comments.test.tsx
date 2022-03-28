import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import {
  Route,
  Routes
} from 'react-router-dom';
import { makeFakeOffer } from '../../mocks/fake-offer';
import FormComments from './form-comments';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    currentOffer: makeFakeOffer(),
  },
});


const history = createMemoryHistory();

describe('Component: FormComments', () => {
  it('should render FormComments correctly', () => {
    history.push(AppRoute.Room);
    const reviewText = 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.';

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormComments />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/Your review/i), reviewText);

    expect(screen.getByDisplayValue(reviewText)).toBeInTheDocument();
  });

  it('when user click City should redirect', () => {
    history.push(AppRoute.Room);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Room}
              element={<FormComments />}
            />
            <Route
              path={AppRoute.Root}
              element={<h1>Mock Main Page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );
  });
});
