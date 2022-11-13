import './currencyInput.css';

function CurrencyInput({ onAmountChange, onCurrencyChange, currencies, currency, amount }) {
  return (
    <div className="group">
      <input type="number" value={amount} onChange={(ev) => onAmountChange(ev.target.value)} />
      <select value={currency} onChange={(ev) => onCurrencyChange(ev.target.value)}>
        {currencies.map((currency, i) => (
          <option key={i} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyInput;
