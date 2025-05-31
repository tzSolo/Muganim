import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import MyFiles from './componnents/my-files.tsx'
import Home from './componnents/home.tsx'
import SharedFiles from './componnents/shared-files.tsx'
import Login from './componnents/Authentication/login.tsx'
import Register from './componnents/Authentication/register.tsx'
import UploadFileToAWS from './componnents/upload-file.tsx'




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