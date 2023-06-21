import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { HelmetProvider } from 'react-helmet-async';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <HelmetProvider>
        <NotFoundScreen />
      </HelmetProvider>
    );

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
  });
});
