export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};

export const RemoveCartItem = (pid) => {
  return { type: REMOVE_CART_ITEM, pid: pid };
};
