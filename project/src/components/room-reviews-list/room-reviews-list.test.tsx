import {
  render,
  screen
} from '@testing-library/react';
import { makeFakeComment } from '../../mocks/fake-comment';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import RoomReviewsList from './room-reviews-list';
import { Provider } from 'react-redux';
import { makeFakeOffer } from '../../mocks/fake-offer';

const mockStore = configureMockStore();

describe('Component: RoomReviewsList', () => {
  it('should render RoomReviewsList correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    const comments = [makeFakeComment()];

    render(
      <Provider store={store}>
        <RoomReviewsList comments={comments}/>
      </Provider>);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render FormAction if user is Auth', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      DATA: {
        currentOffer: makeFakeOffer(),
      },
    });
    const comments = [makeFakeComment()];

    render(
      <Provider store={store}>
        <RoomReviewsList comments={comments}/>
      </Provider>);

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });
});
