requerirAuth();

const inputMensaje   = document.getElementById("inputMensaje");
const btnEnviar      = document.getElementById("btnEnviar");
const chatArea       = document.getElementById("chatArea");
const bienvenida     = document.getElementById("bienvenida");
const btnNuevoChat   = document.getElementById("btnNuevoChat");
const btnLogout      = document.getElementById("btnLogout");
const historialLista = document.getElementById("historialLista");
const usuarioNombre  = document.getElementById("usuarioNombre");

let conversacionActualId = null;

(async function init() {
  const usuario = obtenerUsuario();
  if (usuario) {
    usuarioNombre.textContent = usuario.nombre || usuario.email || "Usuario";
  }

  try {
    const conversaciones = await cargarHistorial();
    renderizarHistorial(conversaciones);
  } catch (_) {}
})();

btnLogout.addEventListener("click", logout);

inputMensaje.addEventListener("keypress", (e) => {
  if (e.key === "Enter") enviarMensaje();
});

btnEnviar.addEventListener("click", enviarMensaje);

async function enviarMensaje() {
  const texto = inputMensaje.value.trim();
  if (!texto) return;

  bienvenida.style.display = "none";
  agregarMensaje(texto, "usuario");
  inputMensaje.value = "";

  const cargando = document.createElement("div");
  cargando.classList.add("mensaje-cargando");
  cargando.textContent = "Pensando...";
  chatArea.appendChild(cargando);
  chatArea.scrollTop = chatArea.scrollHeight;

  try {
    const datos = await enviarMensajeBackend(texto, conversacionActualId);
    chatArea.removeChild(cargando);
    agregarMensaje(datos.respuesta, "ia");

    if (datos.conversacion_id) {
      conversacionActualId = datos.conversacion_id;
    }

    try {
      const conversaciones = await cargarHistorial();
      renderizarHistorial(conversaciones);
    } catch (_) {}

    marcarActivo(conversacionActualId);

  } catch (error) {
    chatArea.removeChild(cargando);
    agregarMensaje("Error al conectar con el servidor.", "ia");
  }
}

btnNuevoChat.addEventListener("click", () => {
  chatArea.innerHTML = "";
  bienvenida.style.display = "flex";
  chatArea.appendChild(bienvenida);
  conversacionActualId = null;
  document.querySelectorAll(".historial-lista li").forEach(li => li.classList.remove("activo"));
});

function renderizarHistorial(conversaciones) {
  historialLista.innerHTML = "";
  conversaciones.forEach(conv => {
    const li = document.createElement("li");
    li.textContent = conv.titulo || "Conversación";
    li.dataset.id = conv.id;
    if (conv.id === conversacionActualId) li.classList.add("activo");
    li.addEventListener("click", () => cargarConversacionEnChat(conv.id));
    historialLista.appendChild(li);
  });
}

async function cargarConversacionEnChat(id) {
  try {
    const conv = await cargarConversacion(id);
    chatArea.innerHTML = "";
    bienvenida.style.display = "none";
    conversacionActualId = id;
    conv.mensajes.forEach(msg => {
      agregarMensaje(msg.texto, msg.rol === "user" ? "usuario" : "ia");
    });
    marcarActivo(id);
  } catch (_) {}
}

function marcarActivo(id) {
  document.querySelectorAll(".historial-lista li").forEach(li => {
    li.classList.toggle("activo", li.dataset.id === String(id));
  });
}

function agregarMensaje(texto, tipo) {
  const div = document.createElement("div");
  div.classList.add(tipo === "usuario" ? "mensaje-usuario" : "mensaje-ia");
  div.textContent = texto;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}