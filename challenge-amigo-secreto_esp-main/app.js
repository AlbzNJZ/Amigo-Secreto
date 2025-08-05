let listaAmigos = [];

function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();

  if (!nombre) {
    alert("Por favor, escribe un nombre válido.");
    return;
  }

  if (listaAmigos.includes(nombre)) {
    alert("Este nombre ya está en la lista.");
    return;
  }

  listaAmigos.push(nombre);
  mostrarLista();
  input.value = "";
}

function mostrarLista() {
  const ul = document.getElementById("listaAmigos");
  ul.innerHTML = "";

  listaAmigos.forEach(amigo => {
    const li = document.createElement("li");
    li.className = "amigo-item"; // Para aplicar estilos CSS
    li.textContent = amigo;
    ul.appendChild(li);
  });
}

function sortearEmparejamientos() {
  if (listaAmigos.length < 2) {
    alert("Debe haber al menos 2 amigos para realizar el sorteo.");
    return;
  }

  let copia = [...listaAmigos];
  copia = copia.sort(() => Math.random() - 0.5);

  let intentos = 0;
  while (hayEmparejamientoInvalido(listaAmigos, copia) && intentos < 10) {
    copia = copia.sort(() => Math.random() - 0.5);
    intentos++;
  }

  if (hayEmparejamientoInvalido(listaAmigos, copia)) {
    alert("No se pudo realizar el sorteo sin emparejamientos inválidos. Intenta de nuevo.");
    return;
  }

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = ""; // Limpia antes de mostrar
  copia.forEach((regalado, i) => {
    const li = document.createElement("li");
    li.className = "resultado-animado";
    li.textContent = `${listaAmigos[i]} ➜ ${regalado}`;
    resultado.appendChild(li);
  });
}

function hayEmparejamientoInvalido(original, mezclado) {
  for (let i = 0; i < original.length; i++) {
    if (original[i] === mezclado[i]) {
      return true;
    }
  }
  return false;
}

