async function enviarMensajeBackend(texto, conversacionId = null) {
  const body = { texto };
  if (conversacionId) body.conversacion_id = conversacionId;

  const datos = await apiFetch("/chat", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return datos;
}