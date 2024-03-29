import { render, screen, waitFor } from '@testing-library/react';
import ModalSuccess from './modal-success';
import userEvent from '@testing-library/user-event';

const setVisibility = jest.fn();

const modalTitle = 'Спасибо за отзыв';
const getNodeRef = () => ({
  current: document.createElement('div'),
});
const onClick = jest.fn();
const onClose = jest.fn();
const fakeApp = (
  <ModalSuccess
    modalRef={getNodeRef()}
    isVisible
    setVisibility={setVisibility}
    title={modalTitle}
    onClick={onClick}
    onClose={onClose}
  />
);

describe('Component: ModalSuccess', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(modalTitle)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться к покупкам/)).toBeInTheDocument();
  });

  it('should call onClose when user click on cross button', async () => {
    render(fakeApp);

    userEvent.click(screen.getByTestId('ClosePopupButton'));
    await waitFor(() => {
      expect(onClose).toBeCalledTimes(1);
    });
  });

  it('should call onClick when user click on return to products button', async () => {
    render(fakeApp);

    userEvent.click(screen.getByTestId('ReturnToProductsButton'));
    await waitFor(() => {
      expect(onClick).toBeCalledTimes(1);
    });
  });
});
