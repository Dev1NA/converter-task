import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


import axios from 'axios';
import { RootState } from '../store';

type objRate = {[key: string]: number};


interface converterSlice {
  rates: objRate,
  amountFrom: number,
  amountTo: number,
  currencyFrom: string,
  currencyTo: string,
  loading: boolean,
  error: boolean,
  eur: number,
  uah: number,
  status: string,
}

const initialState: converterSlice = {
  rates: {},
  amountFrom: 1,
  amountTo: 1,
  currencyFrom: 'USD',
  currencyTo: 'EUR',
  loading: true,
  error: false,
  eur: 0,
  uah: 0,
  status: 'loading',
};



export const fetchRates = createAsyncThunk<objRate>('rates/fetchRatesStatus', async () => {
  const { data } = await axios.get<converterSlice>(
    `https://api.apilayer.com/fixer/latest?base=USD&apikey=${process.env.REACT_APP_CURRENCY_API_KEY}`,
  );
  return data.rates;
});

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    setRates(state, action: PayloadAction<objRate>) {
      state.rates = action.payload;
    },
    setAmountTo(state, action: PayloadAction<number>) {
      state.amountTo = action.payload;
    },
    setAmountFrom(state, action: PayloadAction<number>) {
      state.amountFrom = action.payload;
    },
    setCurrencyTo(state, action: PayloadAction<string>) {
      state.currencyTo = action.payload;
    },
    setCurrencyFrom(state, action: PayloadAction<string>) {
      state.currencyFrom = action.payload;
    },
    setUAH(state, action: PayloadAction<number>) {
      state.uah = action.payload;
    },
    setEUR(state, action: PayloadAction<number>) {
      state.eur = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRates.pending, (state) => {
      state.status = 'loading';
      state.rates = {};
    });
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.status = 'success';
      state.rates = action.payload;
      state.eur = action.payload['EUR'];
      state.uah = action.payload['UAH'];
      state.amountTo =
        (state.amountFrom * action.payload[state.currencyTo]) / action.payload[state.currencyFrom];
      state.amountFrom =
        (state.amountTo * action.payload[state.currencyFrom]) / action.payload[state.currencyTo];
    });
    builder.addCase(fetchRates.rejected, (state) => {
      state.status = 'error';
      state.rates = {};
    });
  },
});

export const { setAmountTo, setAmountFrom, setCurrencyTo, setCurrencyFrom, setRates } =
  converterSlice.actions;
export default converterSlice.reducer;
export const converterData = (state: RootState) => state.converter;

