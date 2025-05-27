import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './componnents/header';
import APIProvider from './contexts/api-context';
import UserProvider from './contexts/user-context';

function App() {
  return <>
    <APIProvider>
      <UserProvider>
        <Header />
        <Outlet />
      </UserProvider>
    </APIProvider>
  </>
}

export default App;