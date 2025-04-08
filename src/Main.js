
import { createBrowserRouter, RouterProvider, Navigate, useRouteLoaderData, redirect } from "react-router-dom";
import Home from "./pages/Home";
import Signup, { action as signUpAction } from "./pages/Signup";
import Login, { action as authAction } from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import ErrorPage from './pages/ErrorPage';

import { tokenProviderLoader } from './auth/tokenProviderService';
import MyPage, { loader as mypageLoader } from "./pages/MyPage";

import TodoList, { loader as todoListLoader } from "./pages/TodoList";
import TodoAdd, { action as todoAddAction } from "./pages/TodoAdd";
import TodoUpdate, { loader as todoUpdateLoader, action as todoUpdateAction } from "./pages/TodoUpdate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, //  loader 및 action 함수에서 발생되는 예외를 처리하는 에러 컴포넌트. 단  return response 인 경우에는 해당 컴포넌트에서 처리함.
    id: 'root',
    loader: tokenProviderLoader, // 로그인시 localStorage에 저장된 token과 userid값을 필요시 제공하는 역할 담당.
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signup',        // 회원가입
        element: <Signup />,
        action: signUpAction
      },
      {
        path: '/login',         // 로그인
        element: <Login />,
        action: authAction
      },
      {
        path: '/logout',        // 로그아웃
        action: async function action() {
          localStorage.clear()
          // localStorage.removeItem('jwtAuthToken');
          // localStorage.removeItem('userid');
          return redirect('/');
        }
      },
      {
        path: '/mypage',       // 마이페이지
        element: <MyPage />,
        loader: mypageLoader
      },
      {
        path: '/todos',         // Todo 목록보기
        element: <TodoList />,
        loader: todoListLoader,
      },
      {
        path: '/todoAdd', element: <TodoAdd />,   // Todo 추가
        action: todoAddAction
      },
      {
        path: '/todoUpdate/:id', element: <TodoUpdate />,  // Todo 수정
        loader: todoUpdateLoader,
        action: todoUpdateAction
      }
    ]
  }
]);

function Main() {
  return <RouterProvider router={router} />
}

export default Main;
