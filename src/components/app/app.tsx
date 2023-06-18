import { Route, Routes } from 'react-router';
import { AppRoute } from '../../const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ProductScreen from '../../pages/product-screen/product-screen';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route
          index
          element={<CatalogScreen />}
        />
        <Route
          path={AppRoute.Catalog}
          element={<CatalogScreen />}
        />
        <Route
          path={AppRoute.Product}
          element={<ProductScreen />}
        />
        <Route
          path={AppRoute.ProductTab}
          element={<ProductScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Route>
    </Routes>
  );
}

export default App;
