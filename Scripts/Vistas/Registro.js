const inputNombre          = document.getElementById("inputNombre");
const inputEmail           = document.getElementById("inputEmail");
const inputPassword        = document.getElementById("inputPassword");
const inputPasswordConfirm = document.getElementById("inputPasswordConfirm");
const btnRegistrar         = document.getElementById("btnRegistrar");
const mensajeError         = document.getElementById("mensajeError");

if (estaAutenticado()) {
  window.location.href = "../Privado/chat.html";
}

[inputNombre, inputEmail, inputPassword, inputPasswordConfirm].forEach(el => {
  el.addEventListener("keypress", (e) => {
    if (e.key === "Enter") crearCuenta();
  });
});

btnRegistrar.addEventListener("click", crearCuenta);

async function crearCuenta() {
  const nombre   = inputNombre.value.trim();
  const email    = inputEmail.value.trim();
  const password = inputPassword.value;
  const confirm  = inputPasswordConfirm.value;

  ocultarError();

  if (!nombre || !email || !password || !confirm) {
    mostrarError("Por favor completa todos los campos.");
    return;
  }

  if (password !== confirm) {
    mostrarError("Las contraseñas no coinciden.");
    return;
  }

  if (password.length < 6) {
    mostrarError("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  btnRegistrar.disabled = true;
  btnRegistrar.textContent = "REGISTRANDO...";

  try {
    await registro(nombre, email, password);
    window.location.href = "login.html";
  } catch (error) {
    mostrarError(error.message || "No se pudo crear la cuenta. Intenta de nuevo.");
    btnRegistrar.disabled = false;
    btnRegistrar.textContent = "REGISTRARSE";
  }
}

function mostrarError(mensaje) {
  mensajeError.textContent = mensaje;
  mensajeError.style.display = "block";
}

function ocultarError() {
  mensajeError.style.display = "none";
}