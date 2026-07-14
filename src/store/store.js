import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import { apiSlice } from './apiSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store

