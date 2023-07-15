import { render, screen } from '@testing-library/react';
import ModalSuccess from './modal-success';

const setVisibility = jest.fn();

const fakeApp = (
  <ModalSuccess
    isVisible
    setVisibility={setVisibility}
  />
);

describe('Component: UserCommentSuccess', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Спасибо за отзыв/)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/)).toBeInTheDocument();
  });
});
