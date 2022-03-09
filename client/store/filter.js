import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

export const fetchTags = createAsyncThunk(
	'/products/tags',
	async () => {
		const { data } = await axios.get(`/api/products/tags`);
		return data;
});

const initialState = {
  gender: '',
  tags: [],
  all: []
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addTag: (state, action) => {
      state.tags = [...state.tags, action.payload]
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter(tag => tag !== action.payload)
    },
    changeGender: (state, action) => {
      state.gender = action.payload
    }
  },
  extraReducers: (builder) => {
		builder.addCase(fetchTags.fulfilled, (state, action) => {
			state.all = action.payload
		})
  }
})

export const { addTag, removeTag, changeGender } = filterSlice.actions

export default filterSlice.reducer
