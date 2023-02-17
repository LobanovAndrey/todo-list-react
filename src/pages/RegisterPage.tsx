import { AuthForm } from 'components/AuthForm/AuthForm';
import { AuthFormType, HandleSubmitType } from 'components/AuthForm/AuthForm.interfaces';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from 'hooks/redux-hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toogleUserLoading } from 'store/slices/userSlice';
import { LOGIN_PAGE_URL } from './Pages.consts';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp: HandleSubmitType = useCallback((
    email, password
  ) => {
    const auth = getAuth();
    dispatch(toogleUserLoading());

    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        console.log(user);
        navigate(LOGIN_PAGE_URL);
        dispatch(toogleUserLoading());
      })
      // TODO: handle errors in auth form
      .catch((error) => {
        console.log(error);
        dispatch(toogleUserLoading());
      });
  }, [dispatch, navigate]);

  return (
    <AuthForm handleSubmit={handleSignUp} formType={AuthFormType.REGISTRATION} />
  )
};

  