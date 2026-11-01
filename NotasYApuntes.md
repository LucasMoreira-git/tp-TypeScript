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
- `Operador de encadenamiento opcional(.?)`: Cuando la ejecución llega a un símbolo **(?.)** el motor de JavaScript evalúa la variable que está a la izquierda del operador:
   1. Si la variable es null o undefined: La ejecución de esa línea se detiene inmediatamente, ignora el resto de la cadena a la derecha y devuelve undefined en lugar de lanzar un error crítico en runtim
   2. Si la variable tiene un valor válido ejecuta la funcion normalmente

## 3. DOM como Estructura de Datos 
En TypeScript, existe una jerarquía de interfaces donde cada etiqueta posee atributos únicos:
- HTMLElement: Interfaz base para cualquier elemento HTML.
- HTMLInputElement: Posee la propiedad .value, .placeholder, etc.
- HTMLButtonElement: Posee la propiedad .disabled, .type, etc.
- HTMLAnchorElement: Posee la propiedad .href, .target, etc.

```TypeScript
// Especificamos el tipo exacto mediante genéricos <T>
const inputEmail = document.querySelector<HTMLInputElement>("#email");
const btnEnviar = document.querySelector<HTMLButtonElement>("#btn-submit");
```
Existen varios **métodos fundamentales** en el DOM que se usan constantemente al desarrollar con JavaScript y TypeScript:
1. `document.querySelector(selector)`: Devuelve el primer elemento que coincida con el selector CSS (ej. ".clase", "#id", "button").
2. `document.querySelectorAll(selector)`: Devuelve todos los elementos que coincidan con el selector en una lista estática (NodeList).
3. `document.getElementById(id)`: Busca un elemento directamente por su atributo id.
4. `document.createElement(etiqueta)`: Crea un elemento HTML nuevo en la memoria del navegador, listo para ser insertado.
5. `elemento.remove()`: Elimina por completo el elemento del HTML.
6. `elemento.replaceWith(nuevoElemento)`: Reemplaza el elemento actual por otro nuevo en la estructura del código.


### Manejo Estricto de Nulos
Dado que el elemento podría no existir en el HTML, el tipo que devuelve querySelector es (HTMLInputElement | null). Intentar acceder directamente a inputEmail.value causará un error en compilación: "Object is possibly 'null'".

Para solucionar esto de forma segura aplicamos **Type Narrowing** (Refinamiento) o **encadenamiento opcional** (?.):
```TypeScript
// Opción A: Bloque condicional (Type Narrowing)
if (inputEmail) {
    // Dentro de este bloque, TS deduce que inputEmail NO es null
    console.log(inputEmail.value);
}


// Opción B: Encadenamiento opcional para ejecución segura
btnEnviar?.addEventListener("click", () => { ... });[cite: 17]
```
### Colecciones de Nodos y Tipado de Eventos
Al usar **querySelectorAll**, TypeScript nos devuelve una estructura llamada NodeListOf<T>
- Se parece a un arreglo, pero `**NO es un Array**`. No posee métodos de transformación algorítmica como .map(), .filter() o .reduce()
- Si necesitamos transformar esa lista, debemos convertir la estructura a un arreglo real mediante `**Array.from()**`.

Por ultimo Tipado de **los eventos** son los disparadores que introducen datos desde la interacción humana hacia la lógica. Para evitar errores al leer coordenadas o teclas presionadas, debemos tipar explícitamente el parámetro del evento


```TypeScript
const inputBusqueda = document.querySelector<HTMLInputElement>("#buscar");

inputBusqueda?.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        console.log("Buscando término:", inputBusqueda.value);
    }
});
```
- `**MouseEvent**`: Para eventos de ratón (click, mousemove). Da acceso a clientX, clientY, etc.   
- `**KeyboardEvent**`: Para eventos de teclado (keydown, keyup). Da acceso a key, code, etc.   

### Ejemplo de analisis de codigo 
```TypeScript
const inputsCantidad = document.querySelectorAll(".cantidad-input");

// Intento de calcular las cantidades totales sumando todos los campos
const listaCantidades = inputsCantidad.map(input => input.value);

const botonComprar = document.querySelector("#btn-comprar");

botonComprar.addEventListener("click", (e) => {
    console.log("Click realizado en pantalla X:", e.clientX);
    
    let primerInput = inputsCantidad[0];
    let total = primerInput.value * 100;
    console.log("Total a pagar:", total);
});
```
## 4. Flujos de Interfaz y Validaciones
Este apartado es para aprender cómo extraer paquetes masivos de datos con la **API FormData**, cuándo usar aserciones de tipo **(as)**, y cómo construir **Type Guards** (typeof e instanceof) para verificar la integridad de la información en tiempo de ejecución.
### Extracción Eficiente de Datos
**FormData** es un objeto que pertenece a la Web API. Si tenes un formulario web con 10 campos, ir uno por uno leyendo (.value) en JavaScript es tedioso. Este objeto extrae automáticamente los valores de todos los elementos <input>, <select> o <textarea> dentro de un formulario que posean el atributo name en el HTML.   

