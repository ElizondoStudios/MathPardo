import { configureStore } from '@reduxjs/toolkit'
import sumaReducer from './slices/sumaSlice'

export default configureStore({
  reducer: {
    suma: sumaReducer,
  },
})