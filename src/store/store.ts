import { configureStore } from '@reduxjs/toolkit'
import totalReducer from './slices/totalSlice';

export default configureStore({
  reducer: {
    total: totalReducer,
  },
})