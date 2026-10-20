## 1. TypeScript Lo Basico

**JavaScript** es dinámico, lo que permite que un dato nazca como un número y mute a un texto en tiempo de ejecución, causando errores impredecibles cuando el sistema ya está en **producción**. **TypeScript** en cambio, su objetivo principal es mover los errores del Tiempo de Ejecución (Runtime) al Tiempo de Compilación (Development).

### Inferencia vs. Tipado Explícito
Cuando asignas un valor inicial a una variable, TypeScript **"infiere"** su tipo y lo bloquea para SIEMPRE. Si defines
```TypeScript
let ciudad = "Mendoza";
```
La variable se sella lógicamente como un string. Es útil, pero  declarar explícitamente los tipos. Obliga al desarrollador y a cualquier agente de IA a respetar estrictamente la estructura de memoria de esa variable.

### any vs unknown
A veces la información entra a nuestro sistema desde fuentes externas (un input del usuario, una base de datos, etc.).
- `ANY`: Convierte la variable a JavaScript puro y desactiva las comprobaciones del compilador.
- `UNKNOWN`: Le dice al sistema: "Aquí hay un dato, pero su estructura es desconocida. No puedes operar con él matemáticamente ni leer sus propiedades hasta que escribas un algoritmo que valide su forma". Esto fuerza el uso de un bloque if (Type Narrowing) antes de procesar la información.

### Arrays y funciones
- `Estructuras de Datos Homogéneas`:Un array en TS garantiza matemáticamente que todos los elementos de la lista comparten el **mismo tipo**. Esto blinda algoritmos de iteración (como un reduce o map), impidiendo que operaciones matemáticas se estrellen contra un elemento tipo string
- `Funciones`: 
```TypeScript
function calcularDescuento(precioBase: number, porcentaje?: number): number {
    if (porcentaje) {
        return precioBase - (precioBase * (porcentaje / 100));
    }
    return precioBase;
}
```
