import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { BlogSlice } from '../features/BlogSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store=configureStore({
    reducer:BlogSlice.reducer
})

export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;