async function login(email, password) {
  const datos = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (datos.token) {
    localStorage.setItem("token", datos.token);
    localStorage.setItem("usuario", JSON.stringify(datos.usuario || { email }));
  }

  return datos;
}

async function registro(nombre, email, password) {
  const datos = await apiFetch("/auth/registro", {
    method: "POST",
    body: JSON.stringify({ nombre, email, password }),
  });
  return datos;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "/index.html";
}

function estaAutenticado() {
  return !!localStorage.getItem("token");
}

function obtenerUsuario() {
  const u = localStorage.getItem("usuario");
  return u ? JSON.parse(u) : null;
}

function requerirAuth() {
  if (!estaAutenticado()) {
    window.location.href = "/Vistas/Publico/login.html";
  }
}