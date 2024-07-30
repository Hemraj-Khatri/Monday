import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let exists = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (exists) {
        state.cartItems = state.cartItems.map((item) =>
          item._id == exists._id ? action.payload : item
        );
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id != action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});
export const { addToCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
