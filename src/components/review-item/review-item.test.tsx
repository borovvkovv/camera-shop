import { render, screen } from '@testing-library/react';
import { formatDateToDayAndMonth } from '../../utils';
import { getFakeReview } from '../../utils/mock';
import ReviewItem from './review-item';

const review = getFakeReview();

const fakeApp = <ReviewItem reviewItem={review} />;

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(formatDateToDayAndMonth(new Date(review.createAt)))).toBeInTheDocument();
    expect(screen.getByText(review.userName)).toBeInTheDocument();
    expect(screen.getByText(review.advantage)).toBeInTheDocument();
    expect(screen.getByText(review.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(review.review)).toBeInTheDocument();
  });
});
