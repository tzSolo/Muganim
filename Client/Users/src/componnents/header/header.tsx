import { useContext } from "react";
import MyWorkspace from "./my-workspace";
import { userContext } from "../../contexts/user-context";
import AuthNav from "./auth-nav";

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
                <ul>
                    {userState.state === "not logged in" ? <AuthNav /> : <MyWorkspace />}
                </ul>
            </nav>
        </header>
    </>
}
export default Header;