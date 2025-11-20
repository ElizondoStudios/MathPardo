import { createSlice } from '@reduxjs/toolkit'

export const sumaSlice = createSlice({
  name: 'suma',
  initialState: {
    value: 0,
  },
  reducers: {
    sumar: (state, action) => {
      state.value += action.payload
    },
    reiniciar: (state) => {
      state.value = 0
    }
  },
})

// Action creators are generated for each case reducer function
export const { sumar, reiniciar } = sumaSlice.actions

export default sumaSlice.reducer