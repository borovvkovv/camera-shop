import { render, screen } from '@testing-library/react';
import Sorts from './sorts';

const fakeApp = <Sorts />;

describe('Component: Sorts', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/по цене/)).toBeInTheDocument();
    expect(screen.getByText(/по популярности/)).toBeInTheDocument();
  });
});
