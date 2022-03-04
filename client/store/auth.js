import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import history from "../history"

const TOKEN = "token"

export const me = createAsyncThunk(
  '/auth/me',
  async () => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const { data } = await axios.get("/auth/me", { headers: { authorization: token }});
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
      history.push("/")
      me()
    } catch (authError) {
      return dispatch({error: authError});
    }
  }
)

export const logOut = createAsyncThunk(

)



export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setError: (state, action) => {
      return action.payload
    },
    logOut: () => {
      window.localStorage.removeItem(TOKEN);
      history.push("/login");
      return {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default authSlice.reducer
