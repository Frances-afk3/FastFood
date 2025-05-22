const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  const res = await fetch(`${apiUrl}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch(`${apiUrl}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
};
