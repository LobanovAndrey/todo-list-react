import React, { useCallback } from 'react';
import { useAppDispatch } from 'hooks/redux-hooks';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthForm } from 'components/AuthForm/AuthForm';
import { AuthFormType, HandleSubmitType } from 'components/AuthForm/AuthForm.interfaces';
import { redirect, useNavigate } from 'react-router-dom';
import { HOME_PAGE_URL } from './Pages.consts';
import { fetchUserFromDB, setUser } from 'store/actions/user.actions';
import { toogleUserLoading } from 'store/slices/userSlice';
import { auth, authProviders } from 'firebase.js';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 
  const handleLogin: HandleSubmitType = useCallback((
    email, password
  ) => {
    const auth = getAuth();
    dispatch(toogleUserLoading());

    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {        
        user.getIdTokenResult().then(token => {
          dispatch(setUser({
            email: user.email,
            id: user.uid, 
            token: token.token,
          })).then(() => {
            navigate(HOME_PAGE_URL);
          })
        });
      })
      // TODO: handle errors in auth form
      .catch((error) => {
        console.log(error);
        dispatch(toogleUserLoading());
      });
  }, [dispatch, navigate]);

  const handleGoogleAuth = useCallback(() => {
    dispatch(toogleUserLoading());

    signInWithPopup(auth, authProviders.googleProvider)
      .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      
      user.getIdTokenResult().then(token => {
        dispatch(setUser({
          email: user.email,
          id: user.uid, 
          token: token.token,
        }));
        navigate(HOME_PAGE_URL);
      })
    }).catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      dispatch(toogleUserLoading());
      console.log(error);
    });
  }, [dispatch, navigate])

  const handleGithubAuth = useCallback(() => {
    dispatch(toogleUserLoading());

    signInWithPopup(auth, authProviders.githubProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        user.getIdTokenResult().then(token => {
          dispatch(setUser({
            email: user.email,
            id: user.uid, 
            token: token.token,
          }));
          navigate(HOME_PAGE_URL);
        })
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GithubAuthProvider.credentialFromError(error);
        dispatch(toogleUserLoading());
        console.log(error);
      });
  }, [dispatch, navigate])

  return (
    <AuthForm
      handleSubmit={handleLogin}
      handleGoogleLogin={handleGoogleAuth}
      handleGitHubLogin={handleGithubAuth}
      formType={AuthFormType.LOGIN}
    />
  );
};

export const loginPageLoader = async () => {
  console.log('Loader login page');

  const user = await fetchUserFromDB();
  if (user.email && user.id && user.token) {
    return redirect(HOME_PAGE_URL);
  }

  return null;
};