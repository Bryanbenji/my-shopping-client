import React, { useState, useEffect } from 'react';
import inventoryApi from '../inventoryApi';
import api from '../api';

const CreateInvoice = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        const allOrders = response.data;

        const invoiceResponse = await inventoryApi.get('/invoices');
        const invoicedOrders = invoiceResponse.data.map(invoice => invoice.orden);

        const unbilledOrders = allOrders.filter(order => !invoicedOrders.includes(order.id));
        setOrders(unbilledOrders);
      } catch (error) {
        console.error('Error fetching orders or invoices:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const details = await Promise.all(
          orders.map(async (order) => {
            const productResponse = await inventoryApi.get(`/products/${order.product_id}`);
            return {
              ...order,
              product_name: productResponse.data.product_name
            };
          })
        );
        setOrderDetails(details);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (orders.length > 0) {
      fetchOrderDetails();
    }
  }, [orders]);

  const handleCreateInvoice = async () => {
    setMessage('');

    if (!selectedOrderId) {
      setMessage('Please select an order');
      return;
    }

    try {
      const response = await inventoryApi.post(`/invoices/${selectedOrderId}`);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error creating invoice:', error);
      setMessage('Error creating invoice');
    }
  };

  return (
    <div>
      <h3>Create Invoice</h3>
      <select value={selectedOrderId} onChange={(e) => setSelectedOrderId(e.target.value)}>
        <option value="">Select an order</option>
        {orderDetails.map((order) => (
          <option key={order.id} value={order.id}>
            {`Order ID: ${order.id}, Pokémon: ${order.product_name}, Quantity: ${order.quantity}`}
          </option>
        ))}
      </select>
      <button onClick={handleCreateInvoice}>Create Invoice</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateInvoice;
