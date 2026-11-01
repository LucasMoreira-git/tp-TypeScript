// 1. Contrato de datos para los usuarios.
export type rol = [ "admin", "user" ]
// 2. Interfaz principal del usuario
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: rol;
}
// 3. DTO para los datos del usuario al momento de registrarse
export interface IRegistroDTO {
    email: string;
    pasword: string;
}
// 4. DTO para los datos del usuario al momento de iniciar sesión
export interface ILoginDTO {
    email: string;
    password: string;
}