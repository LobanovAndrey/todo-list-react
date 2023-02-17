import { Nullable } from "helpers/types";

export interface IUser {
  email: Nullable<string>;
  token: Nullable<string>;
  id: Nullable<string>;
};
