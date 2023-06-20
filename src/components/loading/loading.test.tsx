import { render, screen } from '@testing-library/react';
import Loading from './loading';

const fakeApp = <Loading />;

describe('Component: Loading', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Загрузка.../)).toBeInTheDocument();
  });
});
