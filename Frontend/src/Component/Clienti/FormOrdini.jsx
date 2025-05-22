import React, { useState } from 'react';
import { createOrder } from '../../services/orderService';

const OrderForm = ({ selectedItems }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const orderData = {
      items: selectedItems.map((item) => ({ id: item._id, quantity: 1 })),
    };
    const res = await createOrder(orderData, token);
    setMessage(res.message || 'Ordine inviato!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={selectedItems.length === 0}>
        Invia Ordine
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default OrderForm;
