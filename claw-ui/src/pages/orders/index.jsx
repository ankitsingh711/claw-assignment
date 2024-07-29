import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <ul>
              {order.products.map((product) => (
                <li key={product.product._id}>
                  {product.product.name} - Quantity: {product.quantity}
                </li>
              ))}
            </ul>
            <p>Total Amount: ${order.totalAmount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
