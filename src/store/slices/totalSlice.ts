import { createSlice } from '@reduxjs/toolkit'

export const totalSlice = createSlice({
  name: 'total',
  initialState: {
    value: 0,
  },
  reducers: {
    sumar: (state, action) => {
      state.value += action.payload
    },
    reiniciar: (state) => {
      state.value = 0
    },
    setTotal: (state, action) => {
      // Redondear a un decimal
      state.value = Math.round(action.payload*10)/10;
    }
  },
})

// Action creators are generated for each case reducer function
export const { sumar, reiniciar, setTotal } = totalSlice.actions

export default totalSlice.reducer