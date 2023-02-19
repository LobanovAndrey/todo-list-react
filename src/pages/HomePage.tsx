import {
  Group,
  Header,
  Panel,
  PanelHeader,
  Separator,
  Spacing,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import { Header as HomeHeader } from "components/Header/Header";
import { TodoCreationPanel } from "components/TodoCreationPanel/TodoCreationPanel";
import { TodoList } from "components/TodoList/TodoList";
import { IUser } from "entities/IUser";
import { NonNullableFields } from "helpers/types";
import { useAppDispatch } from "hooks/redux-hooks";
import { useAuth } from "hooks/useAuth";
import { useCallback, useEffect } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { fetchTodos } from "store/actions/todo.actions";
import { fetchUserFromDB, removeUser } from "store/actions/user.actions";
import { setUserInStore } from "store/slices/userSlice";
import { LOGIN_PAGE_URL } from "./Pages.consts";

export const HomePage = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useLoaderData() as NonNullableFields<IUser>;

  useEffect(() => {
    if (!isAuth) {
      dispatch(setUserInStore(user));
    }
    dispatch(fetchTodos(user.id));
  }, [dispatch, isAuth, user]);

  const handleLogout = useCallback(() => {
    dispatch(removeUser());
    navigate(LOGIN_PAGE_URL);
  }, [dispatch, navigate]);

  return (
    <SplitLayout header={<PanelHeader separator={false} />}>
      <SplitCol autoSpaced>
        <View activePanel="home-page">
          <Panel id="home-page">
            <HomeHeader user={user.email} handleLogout={handleLogout} />
              <Panel centered id="home-page-content">
                <Spacing size={15} />
                <TodoCreationPanel />
                <TodoList />
              </Panel>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

export const homePageLoader = async () => {
  console.log("Loader home page");

  const user = await fetchUserFromDB();
  if (user.email && user.id && user.token) {
    return user;
  }

  return redirect(LOGIN_PAGE_URL);
};
