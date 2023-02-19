import { authResponseMessages } from "auth/auth.consts";
import { Nullable } from "helpers/types";
import { validationMessages } from "./AuthForm.consts";
import { ValidationFieldsEnum } from "./AuthForm.interfaces";

export type GetFormErrorsType = {
  message: string;
  place: ValidationFieldsEnum;
};

export const parceAuthFormError = (
  errorMessage: string
): Nullable<GetFormErrorsType> => {
  if (errorMessage.includes(authResponseMessages.emailExists)) {
    return {
      message: validationMessages.emailAlreadyExists,
      place: ValidationFieldsEnum.EMAIL,
    };
  }
  if (errorMessage.includes(authResponseMessages.invalidEmail)) {
    return {
      message: validationMessages.invalidEmail,
      place: ValidationFieldsEnum.EMAIL,
    };
  }
  if (errorMessage.includes(authResponseMessages.userNotFound)) {
    return {
      message: validationMessages.emailNotFound,
      place: ValidationFieldsEnum.EMAIL,
    };
  }
  if (errorMessage.includes(authResponseMessages.invalidPassword)) {
    return {
      message: validationMessages.invalidPassword,
      place: ValidationFieldsEnum.PASSWORD,
    };
  }
  if (errorMessage.includes(authResponseMessages.wrongPassword)) {
    return {
      message: validationMessages.wrongPassword,
      place: ValidationFieldsEnum.PASSWORD,
    };
  }

  return null;
};
