import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './componnents/login.tsx'
import Register from './componnents/register.tsx'
import App from './App.tsx'
import MyWorkspace from './componnents/my-workspace.tsx'

const allRoutes = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      {
        path: "register",
        element: <Register />
      },
      { path: "my-workspace", element: <MyWorkspace /> }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={allRoutes} />
)
