import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { logro } from '../../models/logro'

export const logrosSlice = createSlice({
  name: 'logros',
  initialState: {
    value: {
      logrosCompletados: ([] as logro[]),
      logrosPorCompletar: ([] as logro[]),
      newLogrosCompletados: ([] as logro[])
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
    setNewLogrosCompletados: (state, payload: PayloadAction<logro[]>) => {
      state.value.newLogrosCompletados= payload.payload
    },
    clearNewLogrosCompletados: (state) => {
      state.value.newLogrosCompletados= []
    },
    clearLogros: (state) => {
      state.value = {
        logrosCompletados: ([] as logro[]),
        logrosPorCompletar: ([] as logro[]),
        newLogrosCompletados: ([] as logro[])
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLogrosCompletados, setLogrosPorCompletar, clearLogros, clearNewLogrosCompletados, setNewLogrosCompletados } = logrosSlice.actions

export default logrosSlice.reducer