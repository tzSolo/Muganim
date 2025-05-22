import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './componnents/header';
import UserProvider from './componnents/user-context';
import APIProvider from './componnents/api-context';
import UploadFileToAWS from './componnents/upload-file';

function App() {
  return <>
    <APIProvider>
      <UserProvider>
        <Header />
        <UploadFileToAWS />
        <Outlet />
      </UserProvider>
    </APIProvider>
  </>
}

export default App;