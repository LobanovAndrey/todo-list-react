import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
  HOME_PAGE_URL,
  LOGIN_PAGE_URL,
  SINGUP_PAGE_URL,
} from "pages/Pages.consts";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { HomePage, homePageLoader } from "./pages/HomePage";
import { LoginPage, loginPageLoader } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: HOME_PAGE_URL,
    element: <HomePage />,
    loader: homePageLoader,
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: loginPageLoader,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    loader: () => redirect('/'),
  }
]);

const App = () => {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <RouterProvider router={router} />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
