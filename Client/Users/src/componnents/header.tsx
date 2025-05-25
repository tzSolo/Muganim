import { useContext } from "react";
import { userContext } from "./user-context";
import { Link } from "react-router-dom";
import MyWorkspace from "./my-workspace";

const Header = () => {
    const { userState } = useContext(userContext);

    return <>
        <header>
            <div>
                <span>M</span>
                <span>u</span>
                <span>g</span>
                <span>a</span>
                <span>n</span>
                <span>i</span>
                <span>m</span>
            </div>
            <nav>
                {userState.state === "not logged in" ?
                    <ul>
                        <li>
                            <Link to={"/login"}>Log In</Link>
                        </li>
                        <li>
                            <Link to={"/register"}>Register</Link>
                        </li>
                    </ul>
                    :
                    <ul>
                        <MyWorkspace />
                        <li>
                            <Link to={"/logout"}>Log Out</Link>
                        </li>
                    </ul>
                }
            </nav>
        </header>
    </>
}
export default Header;