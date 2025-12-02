import { createSlice } from '@reduxjs/toolkit'

export const ultimaOperacionSlice = createSlice({
  name: 'ultimaOperacion',
  initialState: {
    value: "",
  },
  reducers: {
    setUltimaOperacionRealizada: (state, payload) => {
      state.value= payload.payload
    },
    reiniciarUltimaOperacionRealizada: (state) => {
      state.value = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUltimaOperacionRealizada, reiniciarUltimaOperacionRealizada } = ultimaOperacionSlice.actions

export default ultimaOperacionSlice.reducer