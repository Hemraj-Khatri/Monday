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
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
      }),
    }),
    changeStatus: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/${data.id}/updatestatus`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  usePlaceOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useChangeStatusMutation,
} = orderSlice;
