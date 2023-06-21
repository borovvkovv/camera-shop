import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { Helmet } from 'react-helmet-async';

const fakeApp = (
  <>
    <Helmet>
      <title>Каталог</title>
    </Helmet>
    <NotFoundScreen />
  </>
);

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
  });
});
