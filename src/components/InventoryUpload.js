import React, { useState } from 'react';
import inventoryApi from '../api';

const InventoryUpload = () => {
  const [message, setMessage] = useState('');

  const handleSyncInventory = async () => {
    setMessage('');

    try {
      const response = await inventoryApi.post('/send'); // Asegúrate de que esta URL sea correcta
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error syncing inventory:', error);
      setMessage('Error syncing inventory');
    }
  };

  return (
    <div>
      <h3>Sync Inventory from Orders CSV</h3>
      <button onClick={handleSyncInventory}>Sync Inventory</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default InventoryUpload;
