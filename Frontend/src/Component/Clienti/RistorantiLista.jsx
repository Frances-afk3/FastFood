import React, { useEffect, useState } from 'react';
import { getRestaurants } from '../../services/restaurantService';

const RestaurantList = ({ onSelect }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants().then(setRestaurants);
  }, []);

  return (
    <div>
      <h2>Ristoranti</h2>
      <ul>
        {restaurants.map((r) => (
          <li key={r._id}>
            <button onClick={() => onSelect(r._id)}>{r.nome}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
