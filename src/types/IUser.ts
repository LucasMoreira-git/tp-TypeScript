
export type rol =  "admin" | "user";
    export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: rol;
}
export interface IRegistroDTO {
    email: string;
    password: string;
}
export interface ILoginDTO {
    email: string;
    password: string;
}