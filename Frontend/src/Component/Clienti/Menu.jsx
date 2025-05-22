import React, { useEffect, useState } from 'react';
import { getMenu } from '../../services/restaurantService';

const Menu = ({ ristoranteId, onAdd }) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (ristoranteId) {
      getMenu(ristoranteId).then(setMenu);
    }
  }, [ristoranteId]);

  return (
    <div>
      <h3>Menu</h3>
      <ul>
        {menu.map((item) => (
          <li key={item._id}>
            {item.nome} - €{item.prezzo.toFixed(2)}
            <button onClick={() => onAdd(item)}>Aggiungi</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
