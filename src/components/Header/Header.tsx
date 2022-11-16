import { useSelector } from 'react-redux';
import { converterData } from '../../redux/slices/converter';
import './header.css';

const Header: React.FC = () => {
  const { uah, eur } = useSelector(converterData);

  return (
    <div className="header">
      <h2>USD: {uah.toFixed(2)}</h2>
      <h2>EUR: {(uah / eur).toFixed(2)}</h2>
    </div>
  );
};

export default Header;
