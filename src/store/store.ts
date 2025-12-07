import { configureStore } from '@reduxjs/toolkit'
import totalReducer from './slices/totalSlice';
import verLogrosReducer from './slices/verLogrosSlice';
import operacionesRealizadasReducer from './slices/operacionesRealizadasSlice';
import ultimaOperacionReducer from './slices/ultimaOperacionSlice';
import totalBloquesReducer from './slices/totalBloquesSlice';
import resultadoUltimaOperacionReducer from './slices/resultadoUltimaOperacionSlice';
import logrosReducer from './slices/logrosSlice';

export default configureStore({
  reducer: {
    total: totalReducer,
    verLogros: verLogrosReducer,
    operacionesRealizadas: operacionesRealizadasReducer,
    ultimaOperacion: ultimaOperacionReducer,
    totalBloques: totalBloquesReducer,
    resultadoUltimaOperacion: resultadoUltimaOperacionReducer,
    logros: logrosReducer
  },
})