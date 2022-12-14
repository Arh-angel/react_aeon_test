import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { JsxElement } from 'typescript';
import { IData } from '../../../models/IData';
import MainService from '../../../services/MainService';
import { RootState } from '../../store';

export const getData = createAsyncThunk(
  'main/getData',
  // eslint-disable-next-line consistent-return
  async () => {
    try {
      const response = await MainService.getData();

      return response.data;
    } catch (err:any) {
      console.log(err.message);
    }
  }
);

export interface MainState {
  data: IData,
  error: string
}

const initialState: MainState = {
  data: {
    period: '',
    project: '',
    chart: {
      id: 0,
      period_end: '',
      period_start: '',
      sub: []
    }
  },
  error: ''
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = {
        period: '',
        project: '',
        chart: {
          id: 0,
          period_end: '',
          period_start: '',
          sub: []
        }
      };
    },
    clearErrorMessage: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = {
        ...action.payload
      };
      state.error = '';
    });
    builder.addCase(getData.rejected, (state, action: { payload:any }) => {
      state.error = action.payload.message;
    });
  },
});

export const { clearData, clearErrorMessage } = mainSlice.actions;

export const selectData = (state: RootState) => state.main.data;
export const selectAuthError = (state: RootState) => state.main.error;

export default mainSlice.reducer;
