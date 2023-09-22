import { configureStore } from '@reduxjs/toolkit';
import filmReducer from '../features/film/filmSlice'

export const store = configureStore({
  reducer: {
    film:filmReducer
  },
});
