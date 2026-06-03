const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar    = document.getElementById("btnEnviar");
const chatArea     = document.getElementById("chatArea");
const bienvenida   = document.getElementById("bienvenida");
const btnNuevoChat = document.getElementById("btnNuevoChat");

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
    const datos = await enviarMensajeBackend(texto);
    chatArea.removeChild(cargando);
    agregarMensaje(datos.respuesta, "ia");
  } catch (error) {
    chatArea.removeChild(cargando);
    agregarMensaje("Error al conectar con el servidor.", "ia");
  }
}

btnNuevoChat.addEventListener("click", () => {
  chatArea.innerHTML = "";
  bienvenida.style.display = "flex";
  chatArea.appendChild(bienvenida);
});

function agregarMensaje(texto, tipo) {
  const div = document.createElement("div");
  div.classList.add(tipo === "usuario" ? "mensaje-usuario" : "mensaje-ia");
  div.textContent = texto;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}