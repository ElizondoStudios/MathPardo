import { configureStore } from '@reduxjs/toolkit'
import totalReducer from './slices/totalSlice';
import verLogrosReducer from './slices/verLogrosSlice';

export default configureStore({
  reducer: {
    total: totalReducer,
    verLogros: verLogrosReducer,
  },
})