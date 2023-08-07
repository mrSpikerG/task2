import { configureStore, ThunkAction, Action,getDefaultMiddleware } from '@reduxjs/toolkit';

import activeNoteSlice from '../redux/NotesSlice';
import notesSlice from '../redux/NotesSlice';


export const store = configureStore({
  reducer: {
    active: notesSlice
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
