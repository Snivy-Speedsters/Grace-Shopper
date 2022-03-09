import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { compareCarts } from "./cart"
import axios from "axios"

const TOKEN = "token"

export const me = createAsyncThunk(
  '/auth/me',
  async (arg, { dispatch }) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.get("/auth/me", { headers: { authorization: token }});
      if(JSON.parse(window.localStorage.products).length !== 0){
        dispatch(compareCarts(data))
      }
      return data
    }
  }
)

export const signUp = createAsyncThunk(
  '/auth/signup',
  async (user, { dispatch }) => {
    try {
      const res = await axios.post(`/auth/signup`, user);
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me())
    } catch (authError) {
      return dispatch({error: authError});
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (user, { dispatch }) => {
    try {
      const res = await axios.post(`/auth/login`, user);
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me())
    } catch (authError) {
      return dispatch({error: authError});
    }
  }
)


// Move to own store evetually
export const updateUser = createAsyncThunk(
  'user/update',
  async (updatedUser) => {
    const token = window.localStorage.getItem(TOKEN);
    await axios.put(`/api/users/update`, { headers: { authorization: token }, updatedUser})
  }
)

const initialState = {}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload
    },
    logOut: () => {
      window.localStorage.removeItem(TOKEN);
      return initialState
    },
  },
  extraReducers(builder){
    builder.addCase(me.fulfilled, (state, { payload }) => {
      return payload
    })
  }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer
