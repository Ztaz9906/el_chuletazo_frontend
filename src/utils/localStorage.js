// Cargar estado desde localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined; // Si no hay nada en localStorage, se devuelve undefined.
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined; // En caso de error, retorna undefined.
  }
};

// Guardar estado en localStorage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.error("Error guardando el estado en localStorage", err);
  }
};
