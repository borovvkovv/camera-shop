import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakePromoProduct } from '../../utils/mock';
import Banner from './banner';
import thunk from 'redux-thunk';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';

const promoProduct = getFakePromoProduct();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Data]: {
    product: null,
    isProductLoading: false,
    promo: promoProduct,
    isPromoLoading: false,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Banner />
    </HistoryRouter>
  </Provider>
);

describe('Component: Banner', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(screen.getByText(promoProduct.name)).toBeInTheDocument();
  });
});
