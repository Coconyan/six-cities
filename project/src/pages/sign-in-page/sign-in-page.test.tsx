import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import SignInPage from './sign-in-page';
import { cities } from '../../mocks/cities';

const mockStore = configureMockStore();

describe('Component: SignInPage', () => {
  it('should render "SignInPage" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        currentCity: cities[0],
      },
    });
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignInPage />
        </HistoryRouter>
      </Provider>,
    );

    const signInElements = screen.getAllByText(/Sign in/i);

    expect(signInElements[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'user');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/user/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
