export enum AuthFormType {
  LOGIN = 'LOGIN',
  REGISTRATION = 'REGISTRATION',
}

export type HandleSubmitType = (email: string, password: string) => void;
