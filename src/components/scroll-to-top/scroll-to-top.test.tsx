import { render, fireEvent, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import ScrollToTop from './scroll-to-top';

const history = createMemoryHistory();

const fakeComponent = (
  <HistoryRouter history={history}>
    <ScrollToTop />
    <Routes>
      <Route
        path={AppRoute.Catalog}
        element={<h1>Room page</h1>}
      />
      <Route
        path='*'
        element={<h1>Scroll to top</h1>}
      />
    </Routes>
  </HistoryRouter>
);

describe('Component: ScrollToTop', () => {
  let windowSpy: jest.SpyInstance;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'scrollTo');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should scroll to top when redirect to other page', () => {
    windowSpy.mockImplementation(
      (x: number, y: number): void =>
        void fireEvent.scroll(window, { target: { scrollY: y } })
    );

    act(() => {
      history.push(AppRoute.Catalog);
    });

    render(fakeComponent);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(window.scrollY).toBe(100);

    act(() => {
      history.push('/fake');
    });

    render(fakeComponent);

    expect(window.scrollY).toBe(0);
  });
});
