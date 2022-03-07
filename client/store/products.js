import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const fetchProducts = createAsyncThunk(
  '/products/fetch',
  async () => {
    const { data } = await axios.get("/api/products")
    return data
	}
)

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase (fetchProducts.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default productsSlice.reducer
