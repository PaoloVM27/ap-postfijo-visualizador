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

- [✨ Características Principales](#-características-principales)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [⚡ Instalación y Ejecución](#-instalación-y-ejecución)
- [👀 Uso Básico](#-uso-básico)
- [📸 Capturas de Pantalla](#-capturas-de-pantalla)
- [🧑‍💻 Autores](#-autores)
- [📄 Licencia](#-licencia)

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

## ⚡ Instalación y Ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/floowxy/Postfix-Evaluator-and-Validator-with-Pushdown-Automaton-PA-.git
