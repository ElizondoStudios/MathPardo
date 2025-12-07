import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { logro } from '../../models/logro'

export const logrosSlice = createSlice({
  name: 'logros',
  initialState: {
    value: {
      logrosCompletados: ([] as logro[]),
      logrosPorCompletar: ([] as logro[])
    },
  },
  reducers: {
    setLogrosCompletados: (state, payload: PayloadAction<logro[]>) => {
      state.value.logrosCompletados= payload.payload
      state.value.logrosPorCompletar= state.value.logrosPorCompletar.filter(logro =>(
        !payload.payload.some(l => l.idLogro===logro.idLogro)
      ))
    },
    setLogrosPorCompletar: (state, payload: PayloadAction<logro[]>) => {
      state.value.logrosPorCompletar= payload.payload
    },
    clearLogros: (state) => {
      state.value = {
        logrosCompletados: ([] as logro[]),
        logrosPorCompletar: ([] as logro[])
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLogrosCompletados, setLogrosPorCompletar, clearLogros } = logrosSlice.actions

export default logrosSlice.reducer