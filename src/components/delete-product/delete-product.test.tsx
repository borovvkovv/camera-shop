import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeProductName } from '../../utils';
import { getFakeProduct } from '../../utils/mock';
import HistoryRouter from '../history-router/history-router';
import { MutableRefObject } from 'react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import DeleteProduct from './delete-product';
import userEvent from '@testing-library/user-event';

const setVisibility = jest.fn();
const product = getFakeProduct();
const ref = { current: null } as MutableRefObject<null>;

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: DeleteProduct', () => {
  it('should render correctly', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteProduct
            product={product}
            modalRef={ref}
            isVisible
            setVisibility={setVisibility}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByTestId('DeleteProductPopup')).toHaveClass('is-active');
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(makeProductName(product))).toBeInTheDocument();
    expect(screen.getByText(`${product.level} уровень`)).toBeInTheDocument();
  });

  it('DeleteProduct popup should be hidden when prop isVisible=false', () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteProduct
            product={product}
            modalRef={ref}
            isVisible={false}
            setVisibility={setVisibility}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    expect(screen.getByTestId('DeleteProductPopup')).not.toHaveClass(
      'is-active'
    );
  });

  it('DeleteProduct popup should be hidden when user click on cross button', async () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteProduct
            product={product}
            modalRef={ref}
            isVisible
            setVisibility={setVisibility}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    userEvent.click(screen.getByTestId('ClosePopupButton'));
    await waitFor(() => {
      expect(setVisibility).toBeCalledTimes(1);
    });
  });

  it('DeleteProduct popup should be hidden when user click on delete button', async () => {
    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <DeleteProduct
            product={product}
            modalRef={ref}
            isVisible
            setVisibility={setVisibility}
          />
        </HistoryRouter>
      </Provider>
    );

    render(fakeApp);

    userEvent.click(screen.getByTestId('DeleteButton'));
    await waitFor(() => {
      expect(setVisibility).toBeCalledTimes(1);
    });
  });

});
