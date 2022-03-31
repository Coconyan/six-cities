import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import { cities } from '../../mocks/fake-cities';
import { makeFakeOffer } from '../../mocks/fake-offer';
import HistoryRouter from '../history-router/history-router';
import Map from './map';

const history = createMemoryHistory();

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    currentMapOffer: makeFakeOffer(),
  },
});

describe('Component: Map', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Root);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map city={cities[0]} offers={[makeFakeOffer()]}/>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();
  });
});
