import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './componnents/header';
import UserProvider from './componnents/user-context';
import APIProvider from './componnents/api-context';

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