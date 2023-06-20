import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <Breadcrumbs
      crumbs={[
        {
          name: 'name1',
          path: 'path1',
        },
        {
          name: 'name2',
          path: 'path2',
        },
      ]}
    />
  </HistoryRouter>
);

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('name1')).toBeInTheDocument();
    expect(screen.getByText('name2')).toBeInTheDocument();
  });
});
