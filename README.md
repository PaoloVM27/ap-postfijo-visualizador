# Evaluador-y-Validador-Postfijo-con-Automata-de-Pila
# 🚀 Evaluador y Validador Postfijo con Autómata de Pila (AP)

Simulador visual que implementa un **Autómata de Pila (AP)** para la **evaluación y validación de expresiones aritméticas en Notación Postfija** (RPN, por sus siglas en inglés).

El sistema procesa una cadena de tokens (operandos y operadores `+`, `-`, `*`, `/`) y:

- ✅ Determina si la expresión es **sintácticamente válida**.  
- 🧮 **Calcula el resultado numérico** de la expresión.  

La lógica central del autómata está escrita en **C++** y compilada a **WebAssembly (WASM)** para ejecutarse a alta velocidad en el navegador.

---

## 🎓 Contexto Académico

Este proyecto fue desarrollado como **trabajo final** para el curso de **Teoría de la Computación** en la  
**Facultad de Ingeniería de Sistemas e Informática** de la  
**Universidad Nacional Mayor de San Marcos (UNMSM)**.

---

## 📋 Tabla de Contenidos

- [🧠 Modelo Matemático del Autómata de Pila (AP)](#-modelo-matemático-del-autómata-de-pila-ap)
- [✨ Características Principales](#-características-principales)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [⚡ Instalación y Ejecución](#-instalación-y-ejecución)
- [👀 Uso Básico](#-uso-básico)
- [📸 Capturas de Pantalla](#-capturas-de-pantalla)
- [🧑‍💻 Autores](#-autores)
- [📄 Licencia](#-licencia)
---
## 🧠 Modelo Matemático del Autómata de Pila (AP)

El funcionamiento del evaluador se fundamenta en un **Autómata de Pila** definido formalmente mediante la séptupla:

\[
M = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)
\]

### Definiciones de la Séptupla

| Símbolo | Definición | Descripción |
|--------|------------|-------------|
| \(Q = \{ q_1 \}\) | Conjunto de estados | El autómata utiliza un único estado operativo |
| \(\Sigma = \{ V, +, -, *, / \}\) | Alfabeto de entrada | `V` representa cualquier **operando numérico** |
| \(\Gamma = \{ X, Z_0 \}\) | Alfabeto de la pila | `X` representa un operando almacenado en la pila |
| \(q_0 = q_1\) | Estado inicial | El autómata comienza en `q₁` |
| \(Z_0\) | Símbolo de fondo de pila | Marca el inicio y la base de la pila |
| \(F = \varnothing\) | Conjunto de aceptación | La **aceptación se da cuando la pila queda vacía** |

---

### 🔁 Función de Transición \( \delta \)

| Transición | Acción en la pila | Interpretación |
|-----------|------------------|----------------|
| \( \delta(q_1, \varepsilon, Z_0) = (q_1, Z_0) \) | No cambia | Inicialización |
| \( \delta(q_1, V, Z_0) = (q_1, XZ_0) \) | Apilar X sobre Z₀ | Primer operando |
| \( \delta(q_1, V, X) = (q_1, XX) \) | Apilar X | Operandos sucesivos |
| \( \delta(q_1, +, XX) = (q_1, X) \) | Desapilar 2, apilar 1 | Suma |
| \( \delta(q_1, -, XX) = (q_1, X) \) | Desapilar 2, apilar 1 | Resta |
| \( \delta(q_1, *, XX) = (q_1, X) \) | Desapilar 2, apilar 1 | Multiplicación |
| \( \delta(q_1, /, XX) = (q_1, X) \) | Desapilar 2, apilar 1 | División |
| \( \delta(q_1, \varepsilon, XZ_0) = (q_1, \varepsilon) \) | Vacía completamente | **Aceptación** 🎉 |

---

### 🎯 Interpretación del Proceso

• Cada número leído (V) → Apila un símbolo X.
• Cada operador requiere dos operandos → Debe existir XX en la cima de la pila.
• El operador reemplaza "XX" → "X" → Resultado parcial.
• Al finalizar:
Si la pila queda en "XZ₀" → La expresión es VÁLIDA ✅
Si queda otra configuración → La expresión es INVÁLIDA ❌

---

## ✨ Características Principales

- **Evaluación Postfija:**  
  Calcula el resultado numérico de expresiones en **Notación Postfija (RPN)**.

- **Validación Sintáctica:**  
  Utiliza un **Autómata de Pila formal** para verificar que la expresión cumpla la estructura correcta.

- **Manejo de Errores:**  
  Detección y reporte de errores como:
  - ❌ Operandos insuficientes para una operación.  
  - ❌ División entre cero.  
  - ❌ Expresiones inválidas (por ejemplo, pila con más de un elemento al finalizar).

- **Visualización Web Interactiva:**  
  Interfaz construida con **HTML, CSS y JavaScript**, que permite:
  - Ingresar expresiones.
  - Ver el estado de la evaluación.
  - Mostrar mensajes de éxito o error en tiempo real.

- **Alto Rendimiento:**  
  La lógica crítica del autómata (`pda.cpp`) se ejecuta como **WebAssembly (`pda.wasm`)** en el navegador, combinando:
  - Desempeño de C++ ⚙️  
  - Portabilidad de la Web 🌐

---

## 🛠️ Stack Tecnológico

- **Frontend:**
  - HTML  
  - CSS  
  - JavaScript  

- **Lógica Principal (Backend en el Navegador):**
  - C++ (implementación del Autómata de Pila)

- **Compilación:**
  - [Emscripten](https://emscripten.org/) → WebAssembly (WASM)

- **Modelo Teórico:**
  - Autómata de Pila (AP)

---
## ✈️ OPCIÓN A: VISUALIZAR LA APP SIN INSTALAR
```bash
https://paolovm27.github.io/Evaluador-y-Validador-Postfijo-con-Automata-de-Pila/
```
## ⚡ OPCION B: Instalación y Ejecución

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/PaoloVM27/Evaluador-y-Validador-Postfijo-con-Automata-de-Pila.git

cd Postfix-Evaluator-and-Validator-with-Pushdown-Automaton-PA-
```
## 2️⃣ Abrir el proyecto en `Visual Studio Code`
```bash
cd Postfix-Evaluator-and-Validator-with-Pushdown-Automaton-PA-
code .
```
## 3️⃣ Instalar la extensión `Live Server` (una sola vez)

- Abre la pestaña Extensiones `(Ctrl + Shift + X)`.

- Busca `Live Server` (autor: Ritwick Dey).

- Haz clic en "Instalar".

## 4️⃣ Ejecutar el proyecto

**1.** En el explorador de archivos de VS Code, haz clic derecho sobre `index.html`.

**2.** Selecciona "Open with Live Server".

**3.** El navegador se abrirá automáticamente (por ejemplo en:

`http://127.0.0.1:5500` o `http://localhost:5500).`

## 👀 Uso Básico

**1.** Ingresa una expresión en Notación Postfija, por ejemplo:
```bash
5 3 + 2 *
```

**2.** Presiona el botón `Evaluar` (o equivalente en la interfaz).

**3.** El sistema:

  - Validará la expresión con el **Autómata de Pila**.

  - Mostrará si es **válida** o **inválida**.

  - En caso **válido**, mostrará el **resultado numérico**.

Ejemplos:

**✅ Expresión válida:**
  - `5 3 + 2 *` → Resultado esperado: `16`.

**❌ Expresión inválida:**
  - `5 3 + *` → Error por operandos insuficientes.

## 📸 Capturas de Pantalla

**Ejemplos**

- **Ejemplo de entrada válida**

![Expresión postfija válida: 5 3 + 2 *](./assets/valid-expression.png)


- **Ejemplo de entrada inválida**

![Expresión postfija inválida: 5 3 + *](./assets/invalid-expression.png)

## 🧑‍💻 Autores

Este proyecto fue desarrollado por:

- **Alexis Gonzales**

- **Diego Sotelo**

- **Paolo Villavicencio**

- **Álvaro Salazar**

## 📄 Licencia

Este proyecto se distribuye bajo la licencia indicada en el archivo LICENSE de este repositorio.
Si aún no la has definido, una opción común es la licencia MIT.
