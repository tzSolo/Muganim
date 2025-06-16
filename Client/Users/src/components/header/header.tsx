import { useContext, useEffect } from "react";
import MyWorkspace from "./my-workspace";
import { userContext } from "../../contexts/user-context";
import AuthNav from "./auth-nav";
import { useNavigate } from "react-router-dom";
import * as logo from "../../assets/logo.png"

const Header = () => {
    const { userState } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userState.state === "not logged in") {
            navigate("/login");
        }
    }, [userState.state, navigate]);

    return <>
        <header>
            <div className="container">
                <img src={logo.default} alt="muganim logo" />
                <nav>
                    <ul>
                        {userState.state === "not logged in" ? <AuthNav /> : <MyWorkspace />}
                    </ul>
                </nav>
                <div id="humburger">
                    <div></div>
                </div>
            </div>
        </header>
    </>
}
export default Header;