import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const TOKEN = "token"

export const fetchSingleProduct = createAsyncThunk(
  '/product/fetch',
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data
  }
)

export const updateSingleProduct = createAsyncThunk(
  '/product/update',
  async(product) => {
    const token = window.localStorage.getItem(TOKEN);
    const { id, changes } = product
    await axios.put(`/api/admin/products/${id}`, { changes, headers: { 'authorization': token }});
    fetchSingleProduct(id)
  }
)

export const deleteSingleProduct = createAsyncThunk(
  '/product/delete',
  async(id) => {
    const token = window.localStorage.getItem(TOKEN);
    await axios.delete(`/api/admin/products/${id}`, { headers: { 'authorization': token }});
  }
)

export const createSingleProduct = createAsyncThunk(
  '/product/create',
  async(product) => {
    const token = window.localStorage.getItem(TOKEN);
    await axios.post(`/api/admin/products/`, { product, headers: { 'authorization': token }});
  }
)

const initialState = {tags:[]}

export const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder.addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
      return payload
    })
  }
})

export default singleProductSlice.reducer
