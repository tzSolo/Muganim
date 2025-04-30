import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './componnents/header';
import UserProvider from './componnents/user-context';

function App() {
  return <>
    <UserProvider>
      <Header />
      <Outlet />
    </UserProvider>
  </>
}

export default App;