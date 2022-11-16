import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import converter from './slices/converter';
export const store = configureStore({
  reducer: {
    converter,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()