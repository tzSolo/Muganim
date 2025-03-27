import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return <>
    <Link to={"/login"}>Log In</Link>
    <span> | </span>
    <Link to={"/register"}>Register</Link>
    <br />
    <Outlet />
  </>
}

export default App
