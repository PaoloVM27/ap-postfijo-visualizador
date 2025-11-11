let pasos = [];
let pasoActual = -1;
let statusFinal = null;
let resultadoFinal = null;
let mensajeFinal = "";

const inputExpr = document.getElementById("expr");
const btnRun = document.getElementById("btn-run");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnReset = document.getElementById("btn-reset");

const pilaGammaDiv = document.getElementById("pila-gamma");
const pilaNumDiv = document.getElementById("pila-num");
const textoEstado = document.getElementById("texto-estado");
const textoResultado = document.getElementById("texto-resultado");
const tbodyBitacora = document.querySelector("#tabla-bitacora tbody");

function inicializarUI() {
  btnRun.addEventListener("click", () => {
    const expr = inputExpr.value.trim();
    if (!expr) {
      alert("Ingresa una expresión postfija.");
      return;
    }
    ejecutarSimulacion(expr);
  });

  btnPrev.addEventListener("click", () => {
    if (pasos.length === 0) return;
    if (pasoActual > 0) {
      pasoActual--;
      mostrarPaso(pasoActual);
    }
    actualizarBotonesNavegacion();
  });

  btnNext.addEventListener("click", () => {
    if (pasos.length === 0) return;
    if (pasoActual < pasos.length - 1) {
      pasoActual++;
      mostrarPaso(pasoActual);
    }
    actualizarBotonesNavegacion();
  });

  btnReset.addEventListener("click", () => {
    limpiarEstado();
  });

  limpiarEstado();
}

function limpiarEstado() {
  pasos = [];
  pasoActual = -1;
  statusFinal = null;
  resultadoFinal = null;
  mensajeFinal = "";

  pilaGammaDiv.innerHTML = "";
  pilaNumDiv.innerHTML = "";
  tbodyBitacora.innerHTML = "";

  textoEstado.textContent = "Esperando expresión...";
  textoResultado.textContent = "—";

  btnPrev.disabled = true;
  btnNext.disabled = true;
}

function ejecutarSimulacion(expr) {
  limpiarEstado();

  const log = Module.ccall(
    "simular_postfijo",
    "string",
    ["string"],
    [expr]
  );

  parsearLog(log);
  construirTablaBitacora();

  if (pasos.length > 0) {
    pasoActual = 0;
    mostrarPaso(pasoActual);
  }
  actualizarBotonesNavegacion();
}

function parsearLog(log) {
  const lineas = log.split("\n").filter(l => l.trim() !== "");
  if (lineas.length === 0) return;

  const header = lineas[0].split(";");
  if (header.length >= 6 && header[0] === "STATUS") {
    statusFinal = header[1];
    resultadoFinal = parseFloat(header[3]);
    mensajeFinal = header.slice(5).join(";");
  }

  if (statusFinal === "ok") {
    textoEstado.textContent = "Expresión aceptada por el autómata.";
  } else if (statusFinal === "error_sintactico") {
    textoEstado.textContent = "Error sintáctico (la expresión no es postfija válida).";
  } else if (statusFinal === "error_aritmetico") {
    textoEstado.textContent = "Error aritmético durante la evaluación.";
  } else {
    textoEstado.textContent = "Estado desconocido.";
  }

  if (!isNaN(resultadoFinal)) {
    textoResultado.textContent = resultadoFinal;
  } else {
    textoResultado.textContent = "—";
  }

  pasos = [];
  for (let i = 1; i < lineas.length; i++) {
    const cols = lineas[i].split(";");
    if (cols.length < 7) continue;
    const paso = {
      numPaso: parseInt(cols[0], 10),
      token: cols[1],
      pilaGAntes: cols[2],
      pilaGDespues: cols[3],
      pilaNAntes: cols[4],
      pilaNDespues: cols[5],
      nota: cols.slice(6).join(";"),
    };
    pasos.push(paso);
  }
}

function construirTablaBitacora() {
  tbodyBitacora.innerHTML = "";
  for (const p of pasos) {
    const tr = document.createElement("tr");
    tr.dataset.paso = p.numPaso;
    tr.innerHTML = `
      <td>${p.numPaso}</td>
      <td>${p.token}</td>
      <td>${p.pilaGAntes}</td>
      <td>${p.pilaGDespues}</td>
      <td>${p.pilaNAntes}</td>
      <td>${p.pilaNDespues}</td>
      <td>${p.nota}</td>
    `;
    tbodyBitacora.appendChild(tr);
  }
}

function mostrarPaso(indice) {
  if (indice < 0 || indice >= pasos.length) return;
  const p = pasos[indice];

  dibujarPila(p.pilaGDespues, pilaGammaDiv);
  dibujarPila(p.pilaNDespues, pilaNumDiv);

  const filas = tbodyBitacora.querySelectorAll("tr");
  filas.forEach(f => f.classList.remove("activo"));
  const filaActiva = tbodyBitacora.querySelector(`tr[data-paso="${p.numPaso}"]`);
  if (filaActiva) {
    filaActiva.classList.add("activo");
    filaActiva.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function pilaTextoAJson(textoPila) {
  const limpio = textoPila.replace(/[\[\]\s]/g, "");
  if (!limpio) return [];

  const elementos = limpio.split(",").filter(e => e !== "");
  return elementos.map((el, idx) => ({
    valor: el,
    index: idx,
  }));
}

function dibujarPila(textoPila, contenedor) {
  contenedor.innerHTML = "";

  const modelo = pilaTextoAJson(textoPila);
  if (modelo.length === 0) return;

  contenedor.classList.add("pila-contenedor-3d");

  modelo.forEach((celda) => {
    const cubo = document.createElement("div");
    cubo.className = "pila-cubo";

    const caraFrontal = document.createElement("span");
    caraFrontal.className = "pila-cubo-label";
    caraFrontal.textContent = celda.valor;

    cubo.appendChild(caraFrontal);
    contenedor.appendChild(cubo);
  });
}

function actualizarBotonesNavegacion() {
  if (pasos.length === 0) {
    btnPrev.disabled = true;
    btnNext.disabled = true;
    return;
  }

  btnPrev.disabled = (pasoActual <= 0);
  btnNext.disabled = (pasoActual >= pasos.length - 1);
}

if (typeof Module !== "undefined") {
  Module.onRuntimeInitialized = () => {
    inicializarUI();
  };
} else {
  console.error("No se pudo encontrar Module de Emscripten.");
  inicializarUI();
}

