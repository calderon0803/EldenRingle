export const getDailyNumber = () => {
  const today = new Date();
  const todayNumber =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate(); // Se obtiene una representación numérica de la fecha (YYYYMMDD)
  const seed = todayNumber % 10000; // Tomamos los últimos 4 dígitos para usar como semilla

  // Aplicamos alguna función hash (en este caso simplemente tomamos el módulo de la semilla)
  const randomNumber = Math.abs(Math.sin(seed)) * 1000000;
  return randomNumber;
};
