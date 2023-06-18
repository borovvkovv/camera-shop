import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/store';

const initialState: AppProcess = {
  currentFilter: null,
  currentSort: null,
  currentPage: 1,
};

export const appProcess = createSlice({
  name: NameSpace.APP,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
});

export const { setCurrentPage } = appProcess.actions;
