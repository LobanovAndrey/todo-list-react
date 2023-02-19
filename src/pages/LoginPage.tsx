import { useCallback } from "react";
import { useAppDispatch } from "hooks/redux-hooks";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { AuthForm } from "components/AuthForm/AuthForm";
import {
  AuthFormType,
  HandleSubmitType,
} from "components/AuthForm/AuthForm.interfaces";
import { redirect, useNavigate } from "react-router-dom";
import { HOME_PAGE_URL } from "./Pages.consts";
import { fetchUserFromDB, setUser } from "store/actions/user.actions";
import { setAuthError, setAuthPending } from "store/slices/userSlice";
import { auth, authProviders } from "firebase.js";
import { FirebaseError } from "firebase/app";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAuth = useCallback(
    (userCredential: Promise<UserCredential>) => {
      dispatch(setAuthPending());
      userCredential
        .then(({ user }) => {
          dispatch(
            setUser({
              email: user.email ||  user.displayName || "Anonymous",
              id: user.uid,
              token: (user as any).accessToken,
            })
          ).then(() => {
            navigate(HOME_PAGE_URL);
          });
        })
        .catch((error: FirebaseError) => {
          console.error(error);
          dispatch(setAuthError(error.code));
        });
    },
    [dispatch, navigate]
  );

  const handleNativeLogin: HandleSubmitType = useCallback(
    (email, password) => {
      handleAuth(signInWithEmailAndPassword(auth, email, password));
    },
    [handleAuth]
  );

  const handleGoogleLogin = useCallback(() => {
    handleAuth(signInWithPopup(auth, authProviders.googleProvider));
  }, [handleAuth]);

  const handleGithubLogin = useCallback(() => {
    handleAuth(signInWithPopup(auth, authProviders.githubProvider));
  }, [handleAuth]);

  return (
    <AuthForm
      handleSubmit={handleNativeLogin}
      handleGoogleLogin={handleGoogleLogin}
      handleGitHubLogin={handleGithubLogin}
      formType={AuthFormType.LOGIN}
    />
  );
};

export const loginPageLoader = async () => {
  console.log("Loader login page");

  const user = await fetchUserFromDB();
  if (user.email && user.id && user.token) {
    return redirect(HOME_PAGE_URL);
  }

  return null;
};
