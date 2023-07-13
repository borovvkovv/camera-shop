import { Route, Routes } from 'react-router';
import { AppRoute } from '../../const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import { HelmetProvider } from 'react-helmet-async';
import BasicLayout from '../basic-layout/basic-layout';
import Basket from '../../pages/basket-screen/basket-screen';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<BasicLayout />}
        >
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
            path={AppRoute.Basket}
            element={<Basket />}
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
