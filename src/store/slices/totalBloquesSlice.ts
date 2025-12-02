import { createSlice } from '@reduxjs/toolkit'

export const totalBloquesSlice = createSlice({
  name: 'totalBloques',
  initialState: {
    value: 0,
  },
  reducers: {
    setTotalBloques: (state, payload) => {
      state.value = payload.payload
    },
    reiniciarTotalBloques: (state) => {
      state.value = 0
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTotalBloques, reiniciarTotalBloques } = totalBloquesSlice.actions

export default totalBloquesSlice.reducer