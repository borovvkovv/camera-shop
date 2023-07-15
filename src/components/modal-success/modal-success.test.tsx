import { render, screen } from '@testing-library/react';
import ModalSuccess from './modal-success';

const setVisibility = jest.fn();

const modalTitle = 'Спасибо за отзыв';
const fakeApp = (
  <ModalSuccess
    isVisible
    setVisibility={setVisibility}
    title={modalTitle}
  />
);

describe('Component: UserCommentSuccess', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(modalTitle)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/)).toBeInTheDocument();
  });
});
