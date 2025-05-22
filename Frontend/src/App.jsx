import React, { useState } from 'react';
import UserLogin from './components/Clienti/Login';
import UserRegister from './components/Clienti/Register';
import RestaurantLogin from './components/Ristorante/Login';
import RestaurantRegister from './components/Ristorante/Register';
import UserArea from './components/Clienti/UserArea';
import RestaurantArea from './components/Ristorante/RestaurantArea';

const App = () => {
  const [area, setArea] = useState(null); // 'user' | 'restaurant'
  const [isLogged, setIsLogged] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    setArea(null);
  };

  if (!area) {
    return (
      <div>
        <h1>Benvenuto su FastFood</h1>
        <button onClick={() => setArea('user')}>Accedi come Utente</button>
        <button onClick={() => setArea('restaurant')}>Accedi come Ristorante</button>
      </div>
    );
  }

  if (!isLogged) {
    if (area === 'user') {
      return (
        <div>
          <UserLogin onLogin={() => setIsLogged(true)} />
          <UserRegister />
          <button onClick={() => setArea(null)}>Torna indietro</button>
        </div>
      );
    } else {
      return (
        <div>
          <RestaurantLogin onLogin={() => setIsLogged(true)} />
          <RestaurantRegister />
          <button onClick={() => setArea(null)}>Torna indietro</button>
        </div>
      );
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {area === 'user' ? <UserArea /> : <RestaurantArea />}
    </div>
  );
};

export default App;
