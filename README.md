# Food Store - Trabajo Integrador de TypeScript

Aplicacion web desarrollada con TypeScript y Vite para practicar registro de
usuarios, autenticacion, persistencia de datos y proteccion de rutas mediante
roles.

## Objetivo

El objetivo del trabajo es evolucionar la aplicacion Food Store para que:

- Permita registrar nuevos usuarios.
- Guarde los usuarios en `localStorage`.
- Valide el inicio de sesion con email y contraseña.
- Mantenga la sesion activa mediante la clave `userData`.
- Diferencie los permisos de los usuarios `client` y `admin`.
- Bloquee el acceso a las rutas protegidas cuando corresponda.
- Utilice interfaces y tipos para mantener la informacion consistente.

> Esta aplicacion utiliza `localStorage` como simulacion de una base de datos.
> No debe utilizarse para almacenar contraseñas en un sistema real.

## Tecnologias utilizadas

- HTML
- CSS
- TypeScript
- Vite
- `localStorage` del navegador

## Instalacion y ejecucion

Se necesita tener instalado Node.js y npm.

1. Abrir una terminal dentro de la carpeta `TpTypeScript`.
2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir en el navegador la URL indicada por Vite.

Para comprobar que el proyecto compila correctamente:

```bash
npm run build
```

Para visualizar la version compilada:

```bash
npm run preview
```

## Estructura del proyecto

```text
TpTypeScript/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── NotasYApuntes.md
└── src/
    ├── main.ts
    ├── style.css
    ├── vite-env.d.ts
    ├── types/
    │   ├── IUser.ts
    │   └── Rol.ts
    ├── utils/
    │   ├── auth.ts
    │   ├── localStorage.ts
    │   └── navigate.ts
    └── pages/
        ├── auth/
        │   ├── login/
        │   │   ├── login.html
        │   │   └── login.ts
        │   └── registro/
        │       ├── registro.html
        │       └── registro.ts
        ├── client/
        │   └── home/
        │       ├── home.html
        │       └── home.ts
        └── admin/
            └── home/
                ├── home.html
                └── home.ts
```

## Funcionamiento de la autenticacion

### Registro

El formulario de registro obtiene los datos ingresados, valida que sean
correctos y agrega el nuevo usuario al array almacenado bajo la clave
`users`. Los usuarios registrados reciben el rol `client` por defecto.

### Login

El formulario de login busca en `users` una coincidencia entre el email y la
contraseña ingresados. Si las credenciales son correctas, guarda el usuario
logueado en `userData`.

### Proteccion de rutas

El guard de rutas verifica la URL actual y la sesion almacenada:

- Un usuario sin sesion no puede entrar a las zonas protegidas.
- Un usuario `client` no puede acceder a la zona `admin`.
- Un usuario `admin` puede acceder a la zona administrativa.
- Un usuario autenticado es dirigido a la zona correspondiente a su rol.

### Cerrar sesion

Al cerrar sesion se elimina `userData`. Desde ese momento, el usuario debe
volver a autenticarse para acceder a las zonas protegidas.

## Claves utilizadas en `localStorage`

| Clave | Contenido |
|---|---|
| `users` | Array de usuarios registrados |
| `userData` | Usuario que tiene la sesion activa |

## Comprobaciones recomendadas

1. Registrar un usuario nuevo.
2. Confirmar que aparece en `localStorage` dentro de `users`.
3. Iniciar sesion con sus credenciales.
4. Recargar la pagina y comprobar que la sesion persiste.
5. Intentar acceder a la zona administrativa como `client`.
6. Cerrar sesion e intentar volver a una ruta protegida.
7. Probar credenciales incorrectas y emails repetidos.

## Material de estudio

- [`NotasYApuntes.md`](./NotasYApuntes.md): conceptos de TypeScript y
  explicacion de la estructura del proyecto.
- Carpeta `Teoria/`: material teorico utilizado durante el trabajo practico.
