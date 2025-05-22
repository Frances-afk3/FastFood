import React, { useState } from 'react';
import { registerUser } from '../../services/userService';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    setMessage(res.message || 'Registrazione completata!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrazione Utente</h2>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrati</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
