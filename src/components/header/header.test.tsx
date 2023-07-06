import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { NameSpace } from '../../const';
import { Provider } from 'react-redux';
import Header from './header';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Data]: {},
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Header />
    </HistoryRouter>
  </Provider>
);

describe('Header: Header', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('formSearchContainer')).toBeInTheDocument();
  });
});
