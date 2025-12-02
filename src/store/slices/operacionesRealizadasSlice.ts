import { createSlice } from '@reduxjs/toolkit'

export const operacionesRealizadasSlice = createSlice({
  name: 'operacionesRealizadas',
  initialState: {
    value: 0,
  },
  reducers: {
    agregarOperacionRealizada: (state) => {
      state.value +=1
    },
    reiniciarOperacionesRealizadas: (state) => {
      state.value = 0
    },
  },
})

// Action creators are generated for each case reducer function
export const { agregarOperacionRealizada, reiniciarOperacionesRealizadas } = operacionesRealizadasSlice.actions

export default operacionesRealizadasSlice.reducer