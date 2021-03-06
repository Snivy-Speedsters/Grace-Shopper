import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TOKEN = "token"

export const fetchOrders = createAsyncThunk(
  '/users/orders/fetch',
  async () => {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.get("/api/users/orders", { headers: { authorization: token }});
    return data
	}
)

export const fetchAllOrders = createAsyncThunk(
  '/admin/orders',
  async () => {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.get("/api/admin/orders", { headers: { authorization: token }});
    return data
	}
)

export const completeOrder = createAsyncThunk(
  '/admin/order/complete',
  async (orderId, { dispatch }) => {
    const token = window.localStorage.getItem(TOKEN)
    await axios.put(`/api/admin/order/${orderId}/complete`, { headers: { authorization: token }});
    dispatch(fetchAllOrders())
	}
)


export const ordersSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase (fetchOrders.fulfilled, (state, action) => {
      return action.payload
    }),
    builder.addCase (fetchAllOrders.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default ordersSlice.reducer
