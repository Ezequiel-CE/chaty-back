import { Request } from "express";

export interface RegisterData {
  username: string;
  mail: string;
  password: string;
}

export interface DatabaseUserAtributes {
  id: number;
  mail: string;
  password: string;
  username: string;
}

export interface UserAtributes {
  id?: number;
  mail?: string;
  username?: string;
}

export interface ReqUser extends Request {
  user?: UserAtributes;
}

export interface PayloadAtributes {
  id: number;
  mail: string;
  username: string;
  iat: number;
  exp: number;
}
