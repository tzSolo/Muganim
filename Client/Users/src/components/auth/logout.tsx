import { useEffect } from "react";
import { useSaveUserDetails } from "../../hooks/save-user-details";
import { initalUser } from "../../models/user";

const LogOut = () => {
    const { saveUserDetails } = useSaveUserDetails();

    useEffect(() => {
        saveUserDetails({ token: "", user: initalUser, state: "not logged in" });
    }, []);

    return <></>
}
export default LogOut;