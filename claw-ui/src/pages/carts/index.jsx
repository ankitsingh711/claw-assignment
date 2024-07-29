import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('https://claw-assignment.onrender.com/cart', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        console.log('Response data:', response.data);
        setCart(response.data);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to fetch cart. Please try again later.');
      }
    };
    fetchCart();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productId}>
              <h2>{item.product.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.product.price * item.quantity}</p>
            </li>
          ))}
        </ul>
      )}
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
