export enum AuthFormType {
  LOGIN = "LOGIN",
  REGISTRATION = "REGISTRATION",
}

export enum ValidationFieldsEnum {
  EMAIL,
  PASSWORD,
};

export type HandleSubmitType = (email: string, password: string) => void;
