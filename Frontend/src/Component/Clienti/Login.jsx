import React, { useState } from 'react';
import { loginUser } from '../../services/userService';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      onLogin();
    } else {
      setError(res.message || 'Errore login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Utente</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Accedi</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
