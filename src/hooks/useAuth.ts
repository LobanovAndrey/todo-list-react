import { useAppSelector } from "./redux-hooks";

export const useAuth = () => {
  const {email, token, id} = useAppSelector(state => state.user.data);
  return {
    isAuth: !!email,
    email,
    token,
    userId: id,
  };
};