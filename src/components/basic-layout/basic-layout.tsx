import { Outlet } from 'react-router';
import Header from '../header/header';

function BasicLayout(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <div
          className='page-content'
          data-testid='basicLayout'
        >
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default BasicLayout;
