import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CurrencyInput from '../CurrencyInput/CurrencyInput.jsx';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import './converter.css';

function Converter() {
  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('EUR');
  const [rates, setRates] = useState([]);
  const [eur, setEur] = useState(0);
  const [uah, setUah] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amountFrom) {
    setAmountTo(format((amountFrom * rates[currencyTo]) / rates[currencyFrom]));
    setAmountFrom(amountFrom);
  }

  function handleCurrency1Change(currencyFrom) {
    setAmountTo(format((amountFrom * rates[currencyTo]) / rates[currencyFrom]));
    setCurrencyFrom(currencyFrom);
  }

  function handleAmount2Change(amountTo) {
    setAmountFrom(format((amountTo * rates[currencyFrom]) / rates[currencyTo]));
    setAmountTo(amountTo);
  }

  function handleCurrency2Change(currencyTo) {
    setAmountFrom(format((amountTo * rates[currencyFrom]) / rates[currencyTo]));
    setCurrencyTo(currencyTo);
  }
  useEffect(() => {
    axios
      .get(
        `https://api.apilayer.com/fixer/latest?base=USD&apikey=${process.env.REACT_APP_CURRENCY_API_KEY}`,
      )
      .then((response) => {
        setRates(response.data.rates);
        setEur(response.data.rates['EUR']);
        setUah(response.data.rates['UAH']);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);

  return loading ? (
    <Loader />
  ) : error ? (
    <h1 className="error">Something went wrong. Please, try later.</h1>
  ) : (
    <div>
      <Header usd={uah} eur={uah / eur} />
      <div className="converter">
        <h1 className="title">Currency Converter</h1>
        <CurrencyInput
          onAmountChange={handleAmount1Change}
          onCurrencyChange={handleCurrency1Change}
          currencies={Object.keys(rates)}
          amount={amountFrom}
          currency={currencyFrom}
        />
        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(rates)}
          amount={amountTo}
          currency={currencyTo}
        />
        <div className="result">
          {amountFrom + ' ' + currencyFrom + ' = ' + amountTo + ' ' + currencyTo}
        </div>
      </div>
    </div>
  );
}

export default Converter;
