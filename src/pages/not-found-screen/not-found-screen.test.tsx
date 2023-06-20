import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';

const fakeApp = (
  <NotFoundScreen />
);

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
  });
});
