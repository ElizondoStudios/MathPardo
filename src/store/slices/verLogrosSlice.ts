import { createSlice } from '@reduxjs/toolkit'

export const verLogrosSlice = createSlice({
  name: 'verLogros',
  initialState: {
    value: false,
  },
  reducers: {
    verLogros: (state) => {
      state.value = true
    },
    noVerLogros: (state) => {
      state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { verLogros, noVerLogros } = verLogrosSlice.actions

export default verLogrosSlice.reducer