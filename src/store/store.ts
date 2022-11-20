import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import mainReducer from './slice/mainSlice/mainSlice';

const rootReducer = combineReducers({
  main: mainReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
