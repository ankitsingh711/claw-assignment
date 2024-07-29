import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get('/api/cart');
      setCart(response.data);
    };
    fetchCart();
  }, []);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            <h2>{item.product.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${item.product.price * item.quantity}</p>
          </li>
        ))}
      </ul>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
