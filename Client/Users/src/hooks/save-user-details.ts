import { useContext } from "react";
import { User } from "../models/user";
import { userContext } from "../contexts/user-context";
import { useNavigate } from "react-router-dom";

export const useSaveUserDetails = () => {
    const { setUser, setUserState } = useContext(userContext);
    const navigate = useNavigate();

    const saveUserDetails = ({ token, user, state }: { token: string, user: User, state: string }) => {
        sessionStorage.setItem("token", token);
        setUser(user);
        setUserState({ state, token });
        navigate("/home");
    }

    return {saveUserDetails}
}