import React from 'react';
import OrderForm from './components/OrderForm';
import InventoryUpload from './components/InventoryUpload';
import InvoiceList from './components/InvoiceList';
import CreateInvoice from './components/CreateInvoice';

const App = () => {
  return (
    <div>
      <h1>My Shopping</h1>
      <OrderForm onOrderCreated={(order) => console.log('Order created:', order)} />
      <InventoryUpload />
      <CreateInvoice />
      <InvoiceList />
    </div>
  );
};

export default App;
