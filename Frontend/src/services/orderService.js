const apiUrl = import.meta.env.VITE_API_URL;

export const createOrder = async (orderData, token) => {
  const res = await fetch(`${apiUrl}/ordini`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  return res.json();
};
