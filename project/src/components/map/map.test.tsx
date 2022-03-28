import {
  render,
  screen
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { cities } from '../../mocks/fake-cities';
import { makeFakeOffer } from '../../mocks/fake-offer';
import HistoryRouter from '../history-router/history-router';
import Map from './map';

const history = createMemoryHistory();

describe('Component: Map', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Root);

    render(
      <HistoryRouter history={history}>
        <Map city={cities[0]} offers={[makeFakeOffer()]}/>
      </HistoryRouter>);

    expect(screen.getByText(/OpenStreetMap/i)).toBeInTheDocument();
  });
});
