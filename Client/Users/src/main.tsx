import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import MyFiles from './components/files/my-files.tsx'
import Home from './components/home.tsx'
import SharedFiles from './components/files/shared-files.tsx'
import Login from './components/auth/login.tsx'
import Register from './components/auth/register.tsx'
import UploadFileToAWS from './components/files/upload-file.tsx'
import LogOut from './components/auth/logout.tsx'




const allRoutes = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "logout",
        element: <LogOut />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "my-files",
        element: <MyFiles />
      },
      {
        path: "shared-with-me",
        element: <SharedFiles />
      },
      {
        path: "upload",
        element: <UploadFileToAWS />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={allRoutes} />
)