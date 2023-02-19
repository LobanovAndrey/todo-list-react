import { AuthForm } from "components/AuthForm/AuthForm";
import {
  AuthFormType,
  HandleSubmitType,
} from "components/AuthForm/AuthForm.interfaces";
import { auth } from "firebase.js";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "hooks/redux-hooks";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  resetAuthStatus,
  setAuthError,
  setAuthPending,
} from "store/slices/userSlice";
import { LOGIN_PAGE_URL } from "./Pages.consts";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp: HandleSubmitType = useCallback(
    (email, password) => {
      dispatch(setAuthPending());
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate(LOGIN_PAGE_URL);
          dispatch(resetAuthStatus());
        })
        .catch((error: FirebaseError) => {
          console.error(error);
          dispatch(setAuthError(error.code));
        });
    },
    [dispatch, navigate]
  );

  return (
    <AuthForm
      handleSubmit={handleSignUp}
      formType={AuthFormType.REGISTRATION}
    />
  );
};
