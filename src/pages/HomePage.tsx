import { Panel, PanelHeader, Spacing, SplitCol, SplitLayout, View } from '@vkontakte/vkui'
import { Header } from 'components/Header/Header'
import { TodoCreationPanel } from 'components/TodoCreationPanel/TodoCreationPanel'
import { TodoList } from 'components/TodoList/TodoList';
import { IUser } from 'entities/IUser';
import { useAppDispatch } from 'hooks/redux-hooks';
import { useAuth } from 'hooks/useAuth';
import { useCallback, useEffect } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { fetchTodos } from 'store/actions/todo.actions';
import { fetchUserFromDB, removeUser } from 'store/actions/user.actions';
import { setUserInStore } from 'store/slices/userSlice';
import { LOGIN_PAGE_URL } from './Pages.consts';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  const user = useLoaderData() as IUser;

  useEffect(() => {
    if (!isAuth) {
      dispatch(setUserInStore(user));
    }
  }, [dispatch, isAuth, user]);

  useEffect(() => {
    user.id && dispatch(fetchTodos(user.id));
  }, [dispatch, user.id]);

  const handleLogout = useCallback(() => {
    dispatch(removeUser());
    navigate(LOGIN_PAGE_URL);
  }, [dispatch, navigate]);

  return ( 
    <SplitLayout header={
      <PanelHeader separator={false} />
    }>
      <SplitCol autoSpaced>
        <View activePanel='home-page'>
          <Panel id='home-page'>
            <Header user={user.email ?? 'Unknown'} handleLogout={handleLogout} />
            <Panel centered id='home-page-content'>
              <Spacing size={15} />
              <TodoCreationPanel />
              <Spacing size={15} />
              <TodoList />
            </Panel>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  )
}

export const homePageLoader = async () => {
  console.log('Loader home page');

  const user = await fetchUserFromDB();
  if (user.email && user.id && user.token) {
    return user;
  }

  return redirect(LOGIN_PAGE_URL);
};
