import {
  render,
  screen
} from '@testing-library/react';
import PremiumMark from './premium-mark';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(<PremiumMark />);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });
});
