import { render, screen } from '@testing-library/react';
import StarRating from './star-rating';

const rating = 3;
const fakeComponent = <StarRating rating={rating} />;

describe('Component: StarRating', () => {
  it('should render star rating correctly', () => {
    render(fakeComponent);

    expect(screen.getByTestId('starRating')).toHaveTextContent(
      `Рейтинг: ${rating}`
    );
  });
});
