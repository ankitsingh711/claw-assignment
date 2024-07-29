import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <Link to="/">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
    </nav>
  );
};

export default Header;
