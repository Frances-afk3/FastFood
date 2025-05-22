const apiUrl = import.meta.env.VITE_API_URL;

export const getRestaurants = async () => {
  const res = await fetch(`${apiUrl}/ristoranti`);
  return res.json();
};

export const getMenu = async (ristoranteId) => {
  const res = await fetch(`${apiUrl}/menu/${ristoranteId}`);
  return res.json();
};
