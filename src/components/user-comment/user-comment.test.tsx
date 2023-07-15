import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../../services/api';
import { Action } from 'redux';
import { State } from '../../types/store';
import UserComment from './user-comment';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const getNodeRef = () => ({
  current: document.createElement('div'),
});

describe('Component: UserComment', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {
        isCommentSent: false,
        isCommentSending: false,
      },
    });

    render(
      <Provider store={store}>
        <UserComment
          modalRef={getNodeRef()}
          productId={1}
          isVisible
          setVisibility={jest.fn()}
        />
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByTestId('sendUserComment')).toHaveTextContent(
      /Отправить отзыв/i
    );
    expect(screen.getByTestId('userCommentName')).not.toBeDisabled();
    expect(screen.getByTestId('userCommentName')).toHaveTextContent('');

    expect(screen.getByTestId('userCommentAdvantage')).not.toBeDisabled();
    expect(screen.getByTestId('userCommentAdvantage')).toHaveTextContent('');

    expect(screen.getByTestId('userCommentDisadvantage')).not.toBeDisabled();
    expect(screen.getByTestId('userCommentDisadvantage')).toHaveTextContent('');

    expect(screen.getByTestId('userCommentText')).not.toBeDisabled();
    expect(screen.getByTestId('userCommentText')).toHaveTextContent('');

    const stars = screen.getAllByRole('radio');
    stars.forEach((star) => expect(star).not.toBeChecked());
    stars.forEach((star) => expect(star).not.toBeDisabled());
  });

});
