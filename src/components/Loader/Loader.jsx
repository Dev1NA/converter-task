import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import './loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#fff"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
