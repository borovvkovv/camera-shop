import { PRODUCTS_IN_BASKET } from '../const';
import { BasketProduct, LocalStorageProduct } from '../types/basket';
import { ProductCard } from '../types/product-card';

export const getProductsFromLocalStorage = (): LocalStorageProduct[] => {
  const localStorageitem = localStorage.getItem(PRODUCTS_IN_BASKET);
  if (localStorageitem) {
    const obj: unknown = JSON.parse(localStorageitem);
    if (
      Array.isArray(obj) &&
      obj.every(
        (item) =>
          typeof item === 'object' && 'productId' in item && 'quantity' in item
      )
    ) {
      const productsInBasket = obj as LocalStorageProduct[];
      return productsInBasket;
    }
  }
  return [];
};

export const incrementProduct = (product: ProductCard) => {
  const products = getProductsFromLocalStorage();
  const productToAdd = products.find(
    (productInBasket) => productInBasket.productId === product.id
  );
  if (productToAdd) {
    products[products.indexOf(productToAdd)].quantity += 1;
    saveProductsInBasket(products);
  } else {
    products.push({ productId: product.id, quantity: 1 });
    saveProductsInBasket(products);
  }
  document.dispatchEvent(new Event('storage'));
};

export const dicrementProduct = (product: ProductCard) => {
  let products = getProductsFromLocalStorage();
  const productToAdd = products.find(
    (productInBasket) => productInBasket.productId === product.id
  );
  if (productToAdd) {
    products[products.indexOf(productToAdd)].quantity -= 1;
    if (productToAdd.quantity <= 0) {
      products = products.filter(
        (productInfo) => productInfo.productId !== product.id
      );
    }
    saveProductsInBasket(products);
  }
  document.dispatchEvent(new Event('storage'));
};

export const removeProduct = (product: ProductCard) => {
  let products = getProductsFromLocalStorage();
  const isProductInBasket = products.some(
    (productItem) => productItem.productId === product.id
  );
  if (isProductInBasket) {
    products = products.filter(
      (productInfo) => productInfo.productId !== product.id
    );
    saveProductsInBasket(products);
  }
  document.dispatchEvent(new Event('storage'));
};

export const setProductAmount = (productInfo: BasketProduct) => {
  let products = getProductsFromLocalStorage();
  const productToRemove = products.find(
    (productItem) => productItem.productId === productInfo.product.id
  );
  if (productToRemove) {
    if (productInfo.quantity <= 0) {
      products = products.filter(
        (productInLocalStorage) =>
          productInLocalStorage.productId !== productInfo.product.id
      );
    } else {
      products[products.indexOf(productToRemove)].quantity = productInfo.quantity;
    }
  } else {
    products.push({
      productId: productInfo.product.id,
      quantity: productInfo.quantity,
    });
  }
  const productsInBasketAsString = JSON.stringify(products);
  localStorage.setItem(PRODUCTS_IN_BASKET, productsInBasketAsString);
  document.dispatchEvent(new Event('storage'));
};

export const emptyBasket = () => {
  localStorage.removeItem(PRODUCTS_IN_BASKET);
  document.dispatchEvent(new Event('storage'));
};

export const saveProductsInBasket = (
  productInBasket: LocalStorageProduct[]
): void => {
  const productsInBasketAsString = JSON.stringify(productInBasket);
  localStorage.setItem(PRODUCTS_IN_BASKET, productsInBasketAsString);
  document.dispatchEvent(new Event('storage'));
};
