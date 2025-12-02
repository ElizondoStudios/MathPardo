import { createSlice } from '@reduxjs/toolkit'

export const totalBloquesSlice = createSlice({
  name: 'totalBloques',
  initialState: {
    value: 0,
  },
  reducers: {
    agregarTotalBloques: (state) => {
      state.value +=1
    },
    reiniciarTotalBloques: (state) => {
      state.value = 0
    },
  },
})

// Action creators are generated for each case reducer function
export const { agregarTotalBloques, reiniciarTotalBloques } = totalBloquesSlice.actions

export default totalBloquesSlice.reducer