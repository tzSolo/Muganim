import { Outlet } from 'react-router-dom'
import './App.css'
import APIProvider from './contexts/api-context';
import UserProvider from './contexts/user-context';
import Header from './components/header/header';
import MainContainer from './components/main-container';

function App() {
  return <>
    <APIProvider>
      <UserProvider>
        <Header />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </UserProvider>
    </APIProvider>
  </>
}

export default App;