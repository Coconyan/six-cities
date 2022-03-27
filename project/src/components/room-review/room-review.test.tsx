import {
  render,
  screen
} from '@testing-library/react';
import RoomReview from './room-review';
import { makeFakeComment } from '../../mocks/fake-comment';


describe('Component: RoomReview', () => {
  it('should render Review correctly', () => {
    const review = makeFakeComment();

    render(<RoomReview user={review.user} rating={review.rating} comment={review.comment} date={review.date} id={review.id} />);

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
