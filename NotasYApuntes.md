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
**Ejemplo de codigo para analizar**
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
btnEnviar?.addEventListener("click", () => { ... });
```
### Colecciones de Nodos y Tipado de Eventos
Al usar **querySelectorAll**, TypeScript nos devuelve una estructura llamada NodeListOf<T>
- Se parece a un arreglo, pero **NO es un Array**. No posee métodos de transformación algorítmica como .map(), .filter() o .reduce()
- Si necesitamos transformar esa lista, debemos convertir la estructura a un arreglo real mediante **Array.from()**.

Por ultimo Tipado de **los eventos** son los disparadores que introducen datos desde la interacción humana hacia la lógica. Para evitar errores al leer coordenadas o teclas presionadas, debemos tipar explícitamente el parámetro del evento


```TypeScript
const inputBusqueda = document.querySelector<HTMLInputElement>("#buscar");

inputBusqueda?.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        console.log("Buscando término:", inputBusqueda.value);
    }
});
```
- **MouseEvent**: Para eventos de ratón (click, mousemove), da acceso a `clientX`, `clientY`, etc.
- **KeyboardEvent**: Para eventos de teclado (keydown, keyup), da acceso a `key`, `code`, etc.

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
**FormData** es un objeto que pertenece a la Web API. Si tenes un formulario web con 10 campos, ir uno por uno leyendo (.value) en JavaScript es tedioso. Este objeto extrae automáticamente los valores de todos los elementos `<input>`, `<select>` o `<textarea>` dentro de un formulario que posean el atributo name en el HTML.
```TypeScript
const formulario = document.querySelector<HTMLFormElement>("#form-registro");

formulario?.addEventListener("submit", (event: Event) => {
    // 1. Prevenimos la recarga completa del navegador
    event.preventDefault();

    // 2. event.currentTarget se refiere al formulario que disparó el evento
    const formElement = event.currentTarget as HTMLFormElement;

    // 3. Extraemos todos los inputs en una sola estructura
    const data = new FormData(formElement);
});
```

### Type Assertions (as): "Confía en mí, compilador"
Cuando ejecutamos data.get("nombre"), el tipo de retorno devuelto por TypeScript es **FormDataEntryValue | null** (el cual representa un string, un objeto File, o null si la clave no existe)
```TypeScript
const usuarioInput = {
    // Le indicamos a TS: "Fuerza este valor al tipo string"
    nombre: data.get("nombre") as string,
    email: data.get("email") as string,
    // Los valores de FormData siempre son strings, los parseamos a número
    edad: parseInt(data.get("edad") as string)
};
```
- **ADVERTENCIA:** El uso de as ignora las comprobaciones de TypeScript. Si usas **as string** en un campo que retornó null, TypeScript no lanzará error de compilación pero tu aplicación podría fallar al procesar ese dato en tiempo de ejecución

### Type Guards: Verificación en Runtime (typeof e instanceof)
Para evitar confiar a ciegas en las aserciones con as, construimos Type Guards (Guardias de Tipo). Son filtros lógicos que analizan la estructura del dato en tiempo de ejecución antes de procesarlo.

1. **typeOf:** Evalua si una variable es "string", "number", "boolean", "undefined", etc.
```TypeScript
function procesarMonto(valor: string | number): number {
    if (typeof valor === "string") {
        // Dentro de este bloque, TS deduce que 'valor' es un STRING
        return parseFloat(valor);
    }
    // Por descarte, TS deduce que aquí 'valor' es un NUMBER
    return valor;
}
```
2. **instanceOf:** : Evalúa si un objeto fue instanciado a partir de una Clase específica.
```TypeScript
function manipularElemento(elemento: HTMLElement) {
    // HTMLElement no tiene la propiedad .value

    if (elemento instanceof HTMLInputElement) {
        // TypeScript confirma que es un INPUT y habilita .value
        console.log("Texto ingresado:", elemento.value);
    } else if (elemento instanceof HTMLButtonElement) {
        // TypeScript confirma que es un BOTÓN y habilita .disabled
        elemento.disabled = true;
    }
}
```

## 5. Asincronismo, Red y Mapeo de Payloads
Este tema aborda cómo conectar tu aplicación con servicios externos sin congelar la interfaz de usuario y sin perder la rigidez del sistema de tipos al recibir datos desconocidos.

### Flujo de asincronia
Las peticiones por red demoran un tiempo. Si el código fuera síncrono, bloquearía el hilo de ejecución principal (Event Loop) y la pantalla no respondería a clics ni scroll.
Cuando ejecutas una función **async**, no se detiene todo el programa para esperar el resultado de una operación (como una consulta a una base de datos o un fetch). En su lugar, devuelve inmediatamente un objeto tipo Promise que representa un valor que podría no estar listo ahora, pero lo estará en el futuro
Las funciones asíncronas devuelven siempre un envoltorio **Promise<T>**. La palabra clave await pausa la ejecución interna de esa función particular hasta que la promesa se resuelve o rechaza, permitiendo que el motor siga procesando otros eventos de la interfaz.

### Mapeo de Payloads (PAYLOAD =! DTOS)
El payload es el "cargamento" de datos que viaja en una **petición HTTP**. El mapeo de payloads es el proceso de transformar ese JSON crudo que recibes (payload) en un objeto que tu aplicación TypeScript entienda perfectamente y sea cómodo de usar.
Cuando realizas **const data = await response.json()**, TypeScript no puede adivinar en tiempo de compilación qué datos devolverá la API externa, por lo que trata el resultado como any

```TypeScript
interface UsuarioDTO {
    id: number;
    nombre: string;
    email: string;
}

interface RespuestaServidor {
    total: number;
    data: UsuarioDTO[];
}

// Mapeo explícito que elimina el tipo 'any'
const respuesta: RespuestaServidor = await response.json();
```
El flujo real es este:
1. Tu código hace una petición a la API.
2. La API responde con un JSON crudo.
3. Con : RespuestaServidor obligas a TypeScript a reconocer ese JSON bajo la estructura de tus DTOs.

## 6. Estructura del proyecto (Personal)

La estructura del proyecto está organizada para separar las vistas, los tipos
de datos y la lógica reutilizable. Esta separación permite encontrar cada
responsabilidad con facilidad y evita mezclar la interfaz con la lógica de
autenticación.

### La raíz del proyecto

La raíz contiene los archivos generales que hacen funcionar y documentan la
aplicación.

- **`index.html` :** es el HTML inicial que carga el
  navegador. Vite utiliza este archivo como punto de entrada y desde allí
  incorpora el código TypeScript de la aplicación.
- **`package.json` (configuración del proyecto):** Tiene el nombre del
  proyecto, sus dependencias y los comandos disponibles, como `npm run dev` y
  `npm run build`.
- **`tsconfig.json` (configuración de TypeScript):** define cómo debe analizar
  y compilar TypeScript, además de indicar opciones como el modo estricto.
- **`vite.config.ts` (configuración de Vite):** contiene la configuración del
  servidor de desarrollo y del proceso de compilación.
- **`README.md` (documentación principal):** explica el objetivo, la
  instalación, la estructura y el funcionamiento general del proyecto.
- **`NotasYApuntes.md` (material de estudio):** reúne conceptos de TypeScript,
  ejemplos y explicaciones relacionadas con la implementación del trabajo.

### La carpeta `src/` (código fuente)

La carpeta `src/` contiene el código que forma parte de la aplicación.

- **`main.ts` :** es el archivo
  principal que se ejecuta al cargar la aplicación. Aca se puede centralizar
  la verificación de la ruta actual, la existencia de una sesión y los
  permisos del usuario antes de mostrar una vista.
- **`style.css` (estilos globales):** contiene los estilos compartidos por
  las distintas pantallas de la aplicación.
- **`vite-env.d.ts` (declaraciones de Vite):** agrega declaraciones de tipos
  necesarias para que TypeScript reconozca funcionalidades propias de Vite.
  Normalmente no es necesario modificarlo para este trabajo.

### La carpeta `types/` (modelos y contratos)

Esta carpeta define la forma que deben tener los datos. Los tipos funcionan
como contratos: indican qué propiedades existen, qué tipo tiene cada una y
qué valores son válidos.

- **`IUser.ts` (modelo de usuario):** contiene la interfaz del usuario y los
  DTOs relacionados con el registro y el login. Permite que todos los
  archivos utilicen la misma estructura.
- **`Rol.ts` (roles permitidos):** define los roles que puede tener un usuario,
  por ejemplo `admin` o `client`. Así se evita escribir roles arbitrarios o
  con errores de tipeo.

### La carpeta `utils/` (caja de herramientas)

Contiene funciones auxiliares reutilizables. La idea es que la lógica común
se escriba una sola vez y pueda ser utilizada desde distintas pantallas.

- **`localStorage.ts` (persistencia local):** centraliza la lectura y escritura
  de usuarios y sesiones en `localStorage`. Las claves principales son
  `users`, que contiene el array de usuarios, y `userData`, que contiene la
  sesión activa.
- **`auth.ts` (autenticación y autorización):** reúne funciones para saber si
  existe una sesión, obtener el usuario actual, cerrar sesión y comprobar si
  el rol tiene permiso para acceder a una zona.
- **`navigate.ts` (navegación):** centraliza las redirecciones entre login,
  registro, zona del cliente y zona del administrador.

### La carpeta `pages/` (vistas de la aplicación)

Contiene las pantallas HTML y la lógica TypeScript específica de cada una.
En los archivos `.ts` de estas carpetas se capturan eventos como `submit` y
`click`, se validan datos y se actualiza la interfaz.

- **`pages/auth/` (autenticación):** contiene las pantallas relacionadas con
  el acceso de los usuarios.
  - **`login/`:** incluye el formulario de inicio de sesión y la lógica que
    compara email y contraseña contra los usuarios guardados.
  - **`registro/`:** incluye el formulario de alta y la lógica que valida y
    agrega usuarios al array `users`.
- **`pages/client/` (zona del cliente):** contiene la pantalla que puede
  utilizar un usuario con rol `client` una vez que inició sesión.
- **`pages/admin/` (zona administrativa):** contiene la pantalla reservada
  para usuarios con rol `admin`. Su acceso debe estar protegido por el guard.

### Relación entre las partes

El flujo general de la aplicación es el siguiente:

1. El usuario abre `index.html`.
2. La aplicación inicia desde `main.ts`.
3. El guard verifica la ruta y la sesión almacenada.
4. Las páginas de login o registro capturan los datos del usuario.
5. Los modelos de `types/` indican cómo deben ser esos datos.
6. Las funciones de `utils/` guardan, leen y validan la información.
7. La navegación dirige al usuario a la zona permitida según su rol.

Esta organización prepara el proyecto para reemplazar `localStorage` por una
API o una base de datos real en el futuro sin tener que modificar la lógica de
cada pantalla.
