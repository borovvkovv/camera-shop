import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { COMMENTS_ON_PAGE, NameSpace } from '../../const';
import {
  getFakeRevews,
} from '../../utils/mock';
import ReviewList from './review-list';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: ReviewList', () => {
  it('should render correctly reviews', () => {
    const fakeReviews = getFakeRevews(9);
    const selectedCameraId = Number(fakeReviews[0].id);
    const store = mockStore({
      [NameSpace.Data]: {
        reviews: fakeReviews,
        isCommentSending: false,
        isCommentSent: true,
      },
    });

    render(
      <Provider store={store}>
        <ReviewList productId={selectedCameraId} />
      </Provider>
    );

    expect(screen.queryAllByTestId('reviewCard').length).toBe(
      fakeReviews.filter((review) => review.cameraId === selectedCameraId)
        .length <= COMMENTS_ON_PAGE
        ? fakeReviews.filter((review) => review.cameraId === selectedCameraId).length
        : COMMENTS_ON_PAGE
    );
  });

  it('should not render button "Показать больше отзывов" when reviews number is less or equal than 3', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        reviews: getFakeRevews(3),
        isCommentSending: false,
        isCommentSent: true,
      },
    });

    render(
      <Provider store={store}>
        <ReviewList productId={0} />
      </Provider>
    );

    expect(
      screen.queryByTestId('loadMoreReviewsButton')
    ).not.toBeInTheDocument();
  });

});
