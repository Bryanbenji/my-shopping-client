import React, { useState } from 'react';
import api from '../api';
import ProductSearch from './ProductSearch';

const OrderForm = ({ onOrderCreated }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customerData, setCustomerData] = useState('');
  const [error, setError] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!selectedProduct) {
      setError('Please select a product');
      return;
    }
    if (quantity > selectedProduct.stock) {
      setError(`Quantity exceeds available stock for ${selectedProduct.product_name}`);
      return;
    }
    try {
      const response = await api.post('/orders', {
        product_id: selectedProduct.product_id,
        quantity,
        customer_data: customerData
      });
      onOrderCreated(response.data);
      setSelectedProduct(null);
      setQuantity(1);
      setCustomerData('');
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Error creating order');
    }
  };

  return (
    <div>
      <ProductSearch onSelectProduct={handleProductSelect} />
      {selectedProduct && (
        <div>
          <h3>{selectedProduct.product_name} (Available: {selectedProduct.stock})</h3>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            max={selectedProduct.stock}
            required
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Data:</label>
          <textarea
            value={customerData}
            onChange={(e) => setCustomerData(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Order</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default OrderForm;
