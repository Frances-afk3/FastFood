import React, { useState } from 'react';
import RestaurantList from './RestaurantList';
import Menu from './Menu';
import OrderForm from './OrderForm';

const UserArea = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div>
      <h1>Area Cliente</h1>
      <RestaurantList onSelect={setSelectedRestaurant} />

      {selectedRestaurant && (
        <>
          <Menu ristoranteId={selectedRestaurant} onAdd={handleAddToCart} />
          <OrderForm selectedItems={cart} />
        </>
      )}
    </div>
  );
};

export default UserArea;
