import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
// const initialState = {
//   cartItems: localStorage.getItem("cart")
//     ? JSON.parse(localStorage.getItem("cart"))
//     : [],
// };
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
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
      return updateCart(state);
    },
    removeCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id != action.payload
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    allCartClear: (state, action) => {
      state.cartItems = [];
      state.shippingAddress = {};
      state.itemPrice = 0;
      state.shippingCharge = 0;
      state.totalPrice = 0;
    },
  },
});
export const { addToCart, removeCart, saveShippingAddress, allCartClear } =
  cartSlice.actions;
export default cartSlice.reducer;
