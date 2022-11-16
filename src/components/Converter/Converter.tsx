// import { AsyncThunkAction, AsyncThunkAction, AsyncThunkAction } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  converterData,
  fetchRates,
  setAmountFrom,
  setAmountTo,
  setCurrencyFrom,
  setCurrencyTo,
} from '../../redux/slices/converter'
import { AppDispatch, useAppDispatch } from '../../redux/store';
// '../../redux/slices/converter.ts';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import './converter.css';

const Converter: React.FC = () => {
  const { rates, amountTo, amountFrom, currencyFrom, currencyTo, status } = useSelector(converterData);
  const dispatch = useDispatch<AppDispatch>();

  const format = (number: number) => {
    return (~~(number*100)/100);
  }

  function handleAmountFromChange(amountFrom: number) {
    dispatch(setAmountTo(format((amountFrom * rates[currencyTo]) / rates[currencyFrom])));
    dispatch(setAmountFrom(amountFrom));
  }

  function handleCurrencyFromChange(currencyFrom: number) {
    dispatch(setAmountTo(format((amountFrom * rates[currencyTo]) / rates[currencyFrom])));
    dispatch(setCurrencyFrom(currencyFrom.toString()));
  }

  function handleAmountToChange(amountTo: number) {
    dispatch(setAmountFrom(format((amountTo * rates[currencyFrom]) / rates[currencyTo])));
    dispatch(setAmountTo(amountTo));
  }
  function handleCurrencyToChange(currencyTo: number) {
    dispatch(setAmountFrom(format((amountTo * rates[currencyFrom]) / rates[currencyTo])));
    dispatch(setCurrencyTo(currencyTo.toString()));
  }

  const getRates = async () => {
    dispatch(fetchRates());
  };

  useEffect(() => {
    getRates();
  }, []);

  useEffect(() => {
    if (!!rates) {
      const init = () => {
        handleAmountFromChange(1);
      }
      init();
    }
  }, [rates]);

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'error' ? <NotFound /> :(
        <div>
          <Header />
          <div className="converter">
            <h1 className="title">Currency Converter</h1>
            <CurrencyInput
              onAmountChange={handleAmountFromChange}
              onCurrencyChange={handleCurrencyFromChange}
              currencies={Object.keys(rates)}
              amount={amountFrom}
              currency={currencyFrom}
            />
            <CurrencyInput
              onAmountChange={handleAmountToChange}
              onCurrencyChange={handleCurrencyToChange}
              currencies={Object.keys(rates)}
              amount={amountTo}
              currency={currencyTo}
            />
            <div className="result">
              {amountFrom + ' ' + currencyFrom + ' = ' + amountTo + ' ' + currencyTo}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Converter;
