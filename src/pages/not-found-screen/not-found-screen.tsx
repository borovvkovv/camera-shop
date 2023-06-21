import { Helmet } from 'react-helmet-async';

function NotFoundScreen(): JSX.Element {
  return (
    <div className='page-content'>
      <Helmet>
        <title>404</title>
      </Helmet>
      <h1 className='title title--h3'>Страница не найдена</h1>
    </div>
  );
}

export default NotFoundScreen;
