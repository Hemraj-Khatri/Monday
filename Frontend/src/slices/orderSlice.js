import { ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";
export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}/addorder`,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});
export const { usePlaceOrderMutation } = orderSlice;
