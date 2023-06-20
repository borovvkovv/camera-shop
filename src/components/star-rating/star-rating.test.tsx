import { render, screen } from '@testing-library/react';
import StarRating from './star-rating';

const fakeComponent = (
  <StarRating
    rating={3}
  />
);

describe('Component: StarRating', () => {
  it('should render star rating correctly', () => {
    render(fakeComponent);

    const rating = screen.getByTestId('starRating');
    expect(rating).toHaveTextContent('Рейтинг: 3');
  });

});
