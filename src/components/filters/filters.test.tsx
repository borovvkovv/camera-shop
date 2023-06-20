import { render, screen } from '@testing-library/react';
import Filters from './filters';

const fakeApp = <Filters />;

describe('Component: Filters', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Цена/)).toBeInTheDocument();
    expect(screen.getByText(/Категория/)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/)).toBeInTheDocument();
  });
});
