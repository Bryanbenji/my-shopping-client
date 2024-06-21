import React, { useEffect, useState } from 'react';
import api from '../api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Product ID: {order.product_id}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Customer Data: {order.customer_data}</p>
            <img src={order.product_image} alt="Product" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
