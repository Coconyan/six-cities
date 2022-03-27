import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Star from './star';

describe('Component: Star', () => {
  it('should render correctly', () => {
    const star = 5;
    const setRating = jest.fn();

    render(
      <Star
        star={star}
        setRating={setRating}
      />);

    expect(screen.getByRole('radio')).not.toBeChecked();
    expect(screen.getByTitle('perfect')).toBeInTheDocument();
  });

  it('should setRating called when user choose star', () => {
    const star = 5;
    const setRating = jest.fn();

    render(
      <Star
        star={star}
        setRating={setRating}
      />);

    expect(screen.getByRole('radio')).not.toBeChecked();

    userEvent.click(screen.getByRole('radio'));
    expect(setRating).toBeCalled();
    expect(screen.getByRole('radio')).toBeChecked();
  });
});
