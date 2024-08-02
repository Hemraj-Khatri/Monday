export const updateCart = (state) => {
  state.itemPrice = Number(
    state.cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2)
  );
  state.shippingCharge = state.itemPrice >= 100 ? 0 : 5;
  state.totalPrice = Number(
    (state.itemPrice + state.shippingCharge).toFixed(2)
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
