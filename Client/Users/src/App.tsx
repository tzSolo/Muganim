import { Outlet } from 'react-router-dom'
import './App.css'
import APIProvider from './contexts/api-context';
import UserProvider from './contexts/user-context';
import Header from './components/header/header';

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