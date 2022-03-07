import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const TOKEN = "token"

export const fetchUsers = createAsyncThunk(
  '/users/fetch',
  async () => {
    const token = window.localStorage.getItem(TOKEN)
    const { data } = await axios.get("/api/admin/users", { headers: { authorization: token }});
    return data
	}
)

export const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase (fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default usersSlice.reducer
