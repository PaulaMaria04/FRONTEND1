const inputEmail   = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const btnEntrar    = document.getElementById("btnEntrar");
const mensajeError = document.getElementById("mensajeError");

if (estaAutenticado()) {
  window.location.href = "../Privado/chat.html";
}

[inputEmail, inputPassword].forEach(el => {
  el.addEventListener("keypress", (e) => {
    if (e.key === "Enter") iniciarSesion();
  });
});

btnEntrar.addEventListener("click", iniciarSesion);

async function iniciarSesion() {
  const email    = inputEmail.value.trim();
  const password = inputPassword.value;

  ocultarError();

  if (!email || !password) {
    mostrarError("Por favor completa todos los campos.");
    return;
  }

  btnEntrar.disabled = true;
  btnEntrar.textContent = "ENTRANDO...";

  try {
    await login(email, password);
    window.location.href = "../Privado/chat.html";
  } catch (error) {
    mostrarError(error.message || "Credenciales incorrectas. Intenta de nuevo.");
    btnEntrar.disabled = false;
    btnEntrar.textContent = "ENTRAR";
  }
}

function mostrarError(mensaje) {
  mensajeError.textContent = mensaje;
  mensajeError.style.display = "block";
}

function ocultarError() {
  mensajeError.style.display = "none";
}