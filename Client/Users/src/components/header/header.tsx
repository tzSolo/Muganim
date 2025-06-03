import { useContext, useEffect } from "react";
import MyWorkspace from "./my-workspace";
import { userContext } from "../../contexts/user-context";
import AuthNav from "./auth-nav";
import { useNavigate } from "react-router-dom";

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
                <ul>
                    {userState.state === "not logged in" ? <AuthNav /> : <MyWorkspace />}
                </ul>
            </nav>
        </header>
    </>
}
export default Header;