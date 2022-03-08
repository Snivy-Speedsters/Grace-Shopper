import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  gender: '',
  tags: []
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
  }
})

export const { addTag, removeTag, changeGender } = filterSlice.actions

export default filterSlice.reducer
