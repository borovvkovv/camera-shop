import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import BasicLayout from './basic-layout';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import { getFakeProducts } from '../../utils/mock';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const products = getFakeProducts(9);
const store = mockStore({
  [NameSpace.Data]: {
    products
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <BasicLayout />
    </HistoryRouter>
  </Provider>
);

describe('Component: BasicLayout', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('basicLayout')).toBeInTheDocument();
  });
});
