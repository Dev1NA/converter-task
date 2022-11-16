import './currencyInput.css';

type CurrencyInputProps = {
  onAmountChange: Function,
  onCurrencyChange: Function,
  currencies: string[],
  currency: string,
  amount: number,
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ onAmountChange, onCurrencyChange, currencies, currency, amount }) => {
  return (
    <div className="group">
      <input type="number" value={amount} onChange={(ev) => onAmountChange(ev.target.value)} />
      <select value={currency} onChange={(ev) => onCurrencyChange(ev.target.value)}>
        {currencies.map((currency, i: number) => (
          <option key={i} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyInput;
