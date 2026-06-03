const API_BASE_URL = "http://127.0.0.1:8000";

async function apiFetch(endpoint, opciones = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...(opciones.headers || {}),
  };

  const respuesta = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...opciones,
    headers,
  });

  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({ detail: "Error desconocido" }));
    throw new Error(error.detail || `Error ${respuesta.status}`);
  }

  return respuesta.json();
}