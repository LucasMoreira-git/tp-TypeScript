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
En JavaScript y TypeScript, estas herramientas son fundamentales para trabajar con arreglos (arrays) y escribir código más corto y limpio.
1. **.push()**: Añade uno o más elementos al final de un arreglo y modifica el arreglo original. También devuelve la nueva longitud que tiene el arreglo.
```TypeScript
const frutas = ['🍎', '🍌'];
frutas.push('🍊');

console.log(frutas); // Resultado: ['🍎', '🍌', '🍊']
```
2. **.reduce()**: Ejecuta una función sobre cada elemento del arreglo para devolver un único valor final, es como un "acumulador".
```TypeScript
const numeros =;
// El 0 al final es el valor inicial del acumulador
const sumaTotal = numeros.reduce((acumulador, numeroActual) => acumulador + numeroActual, 0);

console.log(sumaTotal); // Resultado: 10
```
3. **=>**: Funcion flecha, sintaxis para crear funciones cortas.
```TypeScript
// Forma tradicional
const duplicarTradicional = function(x) { return x * 2; };

// Con función flecha (=>)
const duplicarFlecha = (x) => x * 2;
```
4. **.map()**: Crea un nuevo arreglo aplicando una función a cada elemento. No modifica el original.
```TypeScript
const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2); // [2, 4, 6]
```
5. **.filter()**: Crea un nuevo arreglo solo con los elementos que cumplan una condición (devuelvan true).
```TypeScript
const edades = [15, 22, 18, 30];
const mayores = edades.filter(edad => edad >= 18); // [22, 18, 30]
```
6. **.find()**: Devuelve el primer elemento que cumpla la condición. Si no encuentra ninguno, devuelve undefined.
```TypeScript
const usuarios = [{id: 1, name: 'Ana'}, {id: 2, name: 'Luis'}];
const usuario = usuarios.find(u => u.id === 2); // {id: 2, name: 'Luis'}
```
` **Ejemplo de codigo para analizar** `
```TypeScript
let datoIngresante: unknown = "1500";
let historialPrecios: number[] = [1000, 1200];

function registrarVenta(nuevoPrecio: any) {
    historialPrecios.push(nuevoPrecio);
    let sumaTotal = historialPrecios.reduce((total, actual) => total + actual, 0);
    return sumaTotal;
}

registrarVenta(datoIngresante);
```
**¿El codigo compila?** 
1. datoIngresante está declarado como unknown.
2. La función registrarVenta declara que su parámetro nuevoPrecio es de tipo any.
3. El comportamiento de TypeScript: Dado que any desactiva completamente la verificación de tipos aceptando cualquier valor, incluyendo variables de tipo unknown.
El codigo *SI* compila any le ordena al compilador ignorar la revisión de ese parámetro.

## 2. Modelado de Estructuras Complejas y Contratos de Dominio
Se pueden definir modelos de dominio claros para garantizar la consistencia de los datos. 

### Type Alias vs. Interface
Ambos sirven para modelar la forma de un objeto, pero tienen propósitos semánticos y capacidades distintas. 
- `Type Alias`: Crea un "sobrenombre" o alias para cualquier tipo de dato, es como  una **etiqueta personalizada**
- `Inteface`: Define un contrato formal explícito para objetos y clases, incluyendo propiedades y firmas de métodos

### Seguridad en las Propiedades
Para evitar que los algoritmos muten datos sensibles o requieran información inexistente, usamos modificadores:   
- `readonly (Inmutabilidad)`: Protege propiedades que no deben cambiar jamás una vez instanciadas (ej: IDs de base de datos, códigos de barra, timestamps). 
- `Opcionales (?)`: Indican que una propiedad puede ser de su tipo asignado o undefined.
- `Operador de Fusión Nula(??)`:Se utiliza para asignar un valor por defecto solo cuando una variable es verdaderamente "nula", es decir, null o undefined, **evalúa como "falso" ÚNICAMENTE a null y undefined**.


## 3. DOM como Estructura de Datos 
