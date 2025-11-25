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

El evaluador se basa en un **Autómata de Pila**, definido mediante la séptupla:

**M = (Q, Σ, Γ, δ, q₀, Z₀, F)**

### Definiciones de la Séptupla

| Símbolo | Nombre | Descripción |
|--------|--------|-------------|
| **Q = { q₁ }** | Conjunto de estados | El autómata trabaja con un único estado |
| **Σ = { V, +, -, *, / }** | Alfabeto de entrada | `V` representa cualquier **operando numérico** |
| **Γ = { X, Z₀ }** | Alfabeto de la pila | `X` representa un operando almacenado en la pila |
| **q₀ = q₁** | Estado inicial | El autómata comienza en `q₁` |
| **Z₀** | Símbolo inicial de pila | Marca la base de la pila |
| **F = ∅** | Conjunto de aceptación | La aceptación se da cuando la **pila queda vacía** |

---

### 🔁 Función de Transición δ

| Transición | Acción en la pila | Descripción |
|-----------|------------------|-------------|
| δ(q₁, ε, Z₀) → (q₁, Z₀) | No cambia | Inicialización |
| δ(q₁, V, Z₀) → (q₁, XZ₀) | Apilar X | Primer operando |
| δ(q₁, V, X) → (q₁, XX) | Apilar X | Operandos sucesivos |
| δ(q₁, +, XX) → (q₁, X) | Desapilar 2 y apilar 1 | Suma |
| δ(q₁, -, XX) → (q₁, X) | Desapilar 2 y apilar 1 | Resta |
| δ(q₁, *, XX) → (q₁, X) | Desapilar 2 y apilar 1 | Multiplicación |
| δ(q₁, /, XX) → (q₁, X) | Desapilar 2 y apilar 1 | División |
| δ(q₁, ε, XZ₀) → (q₁, ε) | Vacía pila | **Aceptación** ✅ |

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

![Expresión postfija válida: 5 1 2 + 4 * + 3 -](captures/valid-expression.png)


- **Ejemplo de entrada inválida**

![Expresión postfija inválida: 6 7 5 1 2 + 4 * + 3 -](captures/invalid-expression.png)

## 🧑‍💻 Autores

Este proyecto fue desarrollado por:

- [**Alexis Gonzales**](https://github.com/Alsgh1103)

- [**Diego Sotelo**](https://github.com/floowxy)

- [**Paolo Villavicencio**](https://github.com/PaoloVM27)

- [**Álvaro Salazar**](https://github.com/Alcachofinha)

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.

Copyright (c) 2025 **Paolo Villavicencio Merella**

El texto completo de la licencia se encuentra en el archivo [`LICENSE`](./LICENSE) de este repositorio.

# 🧮 Calculadora RPN Interactiva

> Una implementación robusta, modular y eficiente de una calculadora de **Notación Polaca Inversa (Reverse Polish Notation)** escrita en **C**.

![Language](https://img.shields.io/badge/Lenguaje-C-00599C?style=flat-square&logo=c&logoColor=white)
![Build](https://img.shields.io/badge/Build-Make-orange?style=flat-square)
![Type](https://img.shields.io/badge/Type-CLI-black?style=flat-square)

---

## 📖 Descripción

Este proyecto consiste en un evaluador de expresiones matemáticas que utiliza una **pila (stack)** dinámica para procesar operaciones en tiempo real. A diferencia de las calculadoras tradicionales, el formato RPN elimina la necesidad de paréntesis, haciendo el cálculo computacionalmente más eficiente y lógico.

El sistema está diseñado para ser **interactivo**, permitiendo al usuario visualizar el estado de la memoria (la pila) después de cada ingreso de datos.

## ✨ Características Principales

* **Arquitectura Modular:** Código separado en lógica de pila (`stack`), utilidades (`utils`) y programa principal (`main`).
* **Visualización en Tiempo Real:** Muestra el contenido de la pila paso a paso.
* **Formato Inteligente:** Muestra decimales solo cuando es necesario (ej: muestra `5` en lugar de `5.000000` y `2.5` si hay decimales).
* **Manejo de Errores:** Sistema de "Muerte Súbita" que detecta y reporta:
    * División por cero.
    * Desbordamiento de pila (Stack Overflow).
    * Sintaxis inválida (ej: letras mezcladas con números).
    * Insuficiencia de operandos.

---

## 📂 Estructura del Proyecto

El código sigue una estructura estándar de la industria para facilitar su mantenimiento y escalabilidad:

```text
rpn-calculator/
├── include/        # Archivos de cabecera (.h)
│   ├── stack.h     # Definiciones de la Pila
│   └── utils.h     # Funciones auxiliares y validaciones
├── src/            # Código fuente (.c)
│   ├── main.c      # Punto de entrada y bucle principal
│   ├── stack.c     # Lógica de las operaciones de la pila
│   └── utils.c     # Implementación de formateo y helpers
├── Makefile        # Script de compilación automatizada
└── README.md       # Documentación del proyecto
