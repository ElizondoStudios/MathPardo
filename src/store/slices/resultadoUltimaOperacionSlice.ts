import { createSlice } from '@reduxjs/toolkit'

export const resultadoUltimaOperacionSlice = createSlice({
  name: 'resultadoUltimaOperacion',
  initialState: {
    value: "",
  },
  reducers: {
    setResultadoUltimaOperacion: (state, payload) => {
      state.value= payload.payload
    },
    reiniciarResultadoUltimaOperacion: (state) => {
      state.value = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { setResultadoUltimaOperacion, reiniciarResultadoUltimaOperacion } = resultadoUltimaOperacionSlice.actions

export default resultadoUltimaOperacionSlice.reducer