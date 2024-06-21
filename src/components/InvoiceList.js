import React, { useEffect, useState } from 'react';
import inventoryApi from '../inventoryApi';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await inventoryApi.get('/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>Invoice List</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <p>Customer Data: {invoice.customer_data}</p>
            <p>Quantity: {invoice.quantity}</p>
            <p>Order Date: {new Date(invoice.order_date).toLocaleDateString()}</p>
            <img src={invoice.product_image} alt="Product" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
