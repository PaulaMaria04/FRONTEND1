async function cargarHistorial() {
  const datos = await apiFetch("/historial", {
    method: "GET",
  });
  return datos;
}

async function cargarConversacion(conversacionId) {
  const datos = await apiFetch(`/historial/${conversacionId}`, {
    method: "GET",
  });
  return datos;
}

async function eliminarConversacion(conversacionId) {
  await apiFetch(`/historial/${conversacionId}`, {
    method: "DELETE",
  });
}