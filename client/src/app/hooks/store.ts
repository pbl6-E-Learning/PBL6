import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import popupReducer from './features/popup.slice';
import { setupListeners } from '@reduxjs/toolkit/query';



export const store = configureStore({
  reducer: {
    popup: popupReducer
  }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
