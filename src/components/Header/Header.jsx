import React from 'react';
import './header.css';

const Header = ({ eur, usd }) => {
  return (
    <div className="header">
      <h2>USD: {usd.toFixed(2)}</h2>
      <h2>EUR: {eur.toFixed(2)}</h2>
    </div>
  );
};

export default Header;
