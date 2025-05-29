import { Link } from "react-router-dom"

const AuthNav = () => {
    return <>
        <li>
            <Link to={"/login"}>Log In</Link>
        </li>
        <li>
            <Link to={"/register"}>Register</Link>
        </li>
    </>
}
export default AuthNav;