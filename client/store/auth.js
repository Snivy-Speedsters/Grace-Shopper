import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { compareCarts } from "./cart"
import axios from "axios"
import history from "../history"

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
      const res = await axios.post(`/auth/${user.method}`, user);
      window.localStorage.setItem(TOKEN, res.data.token);
      history.push("/")
      me()
    } catch (authError) {
      return dispatch({error: authError});
    }
  }
)

export const login = createAsyncThunk(
  'auth/signin',
  async (user, { dispatch }) => {
    try {
      const res = await axios.post(`/auth/${user.method}`, user);
      window.localStorage.setItem(TOKEN, res.data.token);
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
      history.push("/login");
      return initialState
    },
  },
  extraReducers(builder){
    builder.addCase(me.fulfilled, (state, { payload }) => {
      // const localArray = JSON.parse(window.localStorage.products)

      // if(localArray.length !== 0){
      //   if(payload.products.length !== 0){
      //     for(let i = 0; i < payload.products.length)
      //   }
      // } else {
      //   console.log('nuh')
      // }

      return payload
    })
  }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer
