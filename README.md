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
## 2️⃣ Abrir el proyecto en Visual Studio Code
```bash
cd Postfix-Evaluator-and-Validator-with-Pushdown-Automaton-PA-
code .
```
## 3️⃣ Instalar la extensión `Live Server` (una sola vez)

  - Abre la pestaña Extensiones `(Ctrl + Shift + X)`.

  - Busca `Live Server` (autor: Ritwick Dey).
  
  - Haz clic en "Instalar".

## 4️⃣ Ejecutar el proyecto

- En el explorador de archivos de VS Code, haz clic derecho sobre `index.html`.

- Selecciona "Open with Live Server".

- El navegador se abrirá automáticamente (por ejemplo en:

`http://127.0.0.1:5500` o `http://localhost:5500).`

## 👀 Uso Básico

1. Ingresa una expresión en Notación Postfija, por ejemplo:
```bash
5 3 + 2 *
```

2. Presiona el botón `Evaluar` (o equivalente en la interfaz).

3. El sistema:

- Validará la expresión con el Autómata de Pila.

- Mostrará si es válida o inválida.

- En caso válido, mostrará el resultado numérico.

Ejemplos:

✅ Expresión válida:
5 3 + 2 * → Resultado esperado: 16.

❌ Expresión inválida:
5 3 + * → Error por operandos insuficientes.

📸 Capturas de Pantalla

💡 Recomendación: agrega aquí 2–3 imágenes o un GIF del proyecto en acción.

Ejemplos (rellena con tus rutas de imagen reales):

Ejemplo de entrada válida

![Expresión postfija válida: 5 3 + 2 *](./assets/valid-expression.png)


Ejemplo de entrada inválida

![Expresión postfija inválida: 5 3 + *](./assets/invalid-expression.png)

🧑‍💻 Autores

Este proyecto fue desarrollado por:

Alexis Gonzales

Diego Sotelo

Paolo Villavicencio

Álvaro Salazar

📄 Licencia

Este proyecto se distribuye bajo la licencia indicada en el archivo LICENSE de este repositorio.
Si aún no la has definido, una opción común es la licencia MIT.
