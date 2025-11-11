// pda.cpp
#include <vector>
#include <string>
#include <sstream>
#include <cctype>
#include <cstdlib>
#include <iomanip>
#include <cmath>

#include <emscripten/emscripten.h>

static std::string lastLog;

// Convierte pila de chars a string legible, ej: [Z,X,X]
std::string stackToString(const std::vector<char>& st) {
    if (st.empty()) return "[]";
    std::ostringstream oss;
    oss << "[";
    for (size_t i = 0; i < st.size(); ++i) {
        oss << st[i];
        if (i + 1 < st.size()) oss << ",";
    }
    oss << "]";
    return oss.str();
}

// Convierte pila numérica a string, ej: [5,3,8]
std::string stackToString(const std::vector<double>& st) {
    if (st.empty()) return "[]";
    std::ostringstream oss;
    oss << "[";
    for (size_t i = 0; i < st.size(); ++i) {
        oss << st[i];
        if (i + 1 < st.size()) oss << ",";
    }
    oss << "]";
    return oss.str();
}

bool esOperador(const std::string& t) {
    return t == "+" || t == "-" || t == "*" || t == "/";
}

// Intenta parsear número (entero o decimal). Devuelve true si es número válido.
bool esNumero(const std::string& t, double& out) {
    if (t.empty()) return false;
    char* endPtr = nullptr;
    out = std::strtod(t.c_str(), &endPtr);
    if (endPtr == t.c_str()) {
        return false; // no se parseó nada
    }
    // Ignorar espacios finales
    while (*endPtr != '\0') {
        if (!std::isspace(static_cast<unsigned char>(*endPtr))) {
            return false;
        }
        ++endPtr;
    }
    return true;
}

extern "C" {

// Recibe la expresión postfija como string y devuelve un log en formato de texto.
EMSCRIPTEN_KEEPALIVE
const char* simular_postfijo(const char* expr) {
    std::string input = expr ? std::string(expr) : std::string();
    std::istringstream iss(input);
    std::string token;

    std::vector<char> pilaGamma;      // Pila de símbolos: Z base, X por operando
    std::vector<double> pilaNum;      // Pila numérica
    pilaGamma.push_back('Z');         // Símbolo inicial Z0

    bool error = false;
    std::string tipoError = "ok";
    std::string msgFinal = "Expresión aceptada por el autómata.";
    double resultado = 0.0;

    int paso = 0;
    std::ostringstream pasosLog;

    while (iss >> token) {
        ++paso;
        std::string pilaGAntes = stackToString(pilaGamma);
        std::string pilaNAntes = stackToString(pilaNum);
        std::string pilaGDespues;
        std::string pilaNDespues;
        std::string nota;

        if (esOperador(token)) {
            if (pilaGamma.size() < 3 || pilaNum.size() < 2) {
                error = true;
                tipoError = "error_sintactico";
                nota = "Operador '" + token + "' con operandos insuficientes.";
                pilaGDespues = pilaGAntes;
                pilaNDespues = pilaNAntes;
            } else {
                pilaGamma.pop_back();
                pilaGamma.pop_back();
                pilaGamma.push_back('X');

                double b = pilaNum.back(); pilaNum.pop_back();
                double a = pilaNum.back(); pilaNum.pop_back();

                double res = 0.0;
                if (token == "+") {
                    res = a + b;
                    nota = "Se aplica '" + token + "': " + std::to_string(a) + " + " + std::to_string(b);
                } else if (token == "-") {
                    res = a - b;
                    nota = "Se aplica '" + token + "': " + std::to_string(a) + " - " + std::to_string(b);
                } else if (token == "*") {
                    res = a * b;
                    nota = "Se aplica '" + token + "': " + std::to_string(a) + " * " + std::to_string(b);
                } else if (token == "/") {
                    if (std::fabs(b) < 1e-12) {
                        error = true;
                        tipoError = "error_aritmetico";
                        nota = "División por cero.";
                        pilaNum.clear();
                        pilaGamma.clear();
                        pilaGamma.push_back('Z');
                        pilaGDespues = stackToString(pilaGamma);
                        pilaNDespues = stackToString(pilaNum);
                    } else {
                        res = a / b;
                        nota = "Se aplica '" + token + "': " + std::to_string(a) + " / " + std::to_string(b);
                    }
                }

                if (!error) {
                    pilaNum.push_back(res);
                    pilaGDespues = stackToString(pilaGamma);
                    pilaNDespues = stackToString(pilaNum);
                }
            }
        } else {
            double val = 0.0;
            if (!esNumero(token, val)) {
                error = true;
                tipoError = "error_sintactico";
                nota = "Token inválido: '" + token + "'.";
                pilaGDespues = pilaGAntes;
                pilaNDespues = pilaNAntes;
            } else {
                pilaGamma.push_back('X');
                pilaNum.push_back(val);
                nota = "Se lee operando " + token + " y se apila en ambas pilas.";
                pilaGDespues = stackToString(pilaGamma);
                pilaNDespues = stackToString(pilaNum);
            }
        }

        pasosLog << paso << ";"
                 << token << ";"
                 << pilaGAntes << ";"
                 << pilaGDespues << ";"
                 << pilaNAntes << ";"
                 << pilaNDespues << ";"
                 << nota << "\n";

        if (error) break;
    }

    if (!error) {
        if (pilaGamma.size() == 2 && pilaGamma[0] == 'Z' && pilaGamma[1] == 'X'
            && pilaNum.size() == 1) {
            tipoError = "ok";
            resultado = pilaNum.back();
            msgFinal = "Expresión aceptada por el autómata. Resultado = " + std::to_string(resultado);
        } else {
            tipoError = "error_sintactico";
            msgFinal = "La expresión no es postfija válida (las pilas no quedaron en configuración final correcta).";
            if (!pilaNum.empty()) {
                resultado = pilaNum.back();
            }
        }
    }

    std::ostringstream header;
    header << "STATUS;" << tipoError
           << ";RESULT;" << resultado
           << ";MSG;" << msgFinal << "\n";

    lastLog = header.str() + pasosLog.str();
    return lastLog.c_str();
}

} // extern "C"