import { useContext, useReducer } from "react";
import { apiContext } from "./api-context";
import { User } from "../models/user";
import { Outlet, useNavigate } from "react-router-dom";

//קומפוננטה שרושמת משתמש חדש למערכת
const Register = () => {
    const { url } = useContext(apiContext);

    const navigate = useNavigate();

    const registerNewUser = async (user: User) => {
        try {
            const response = await fetch(`${url}/api/Users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const registeredUserDetails = await response.json();
            console.log(registeredUserDetails);
            //שמירת נתוני משתמש שנרשם
            navigate("/my-workspace");
        }
        catch (error) {
            console.error('Register user failed.', error);
        }
    };

    type ChangedField = { field: "name", value: string } | { field: "email", value: string } | { field: "password", value: string } | { field: "roleId", value: string };

    const changeUserDetails = (user: User, changed: ChangedField) => {
        switch (changed.field) {
            case "name":
                return { ...user, name: changed.value }
            case "email":
                return { ...user, email: changed.value }
            case "password":
                return { ...user, password: changed.value }
            default:
                return { ...user, roleId: parseInt(changed.value) }
        }
    };

    const initialUser: User = {
        name: "chavi",
        email: "ch@gmail.com",
        password: "123456",
        roleId: 2
    };

    const [user, dispatchToUser] = useReducer(changeUserDetails, initialUser);
    return <>
        <input onChange={({ target }) => dispatchToUser({ field: "name", value: target.value })} />
        <input onChange={({ target }) => dispatchToUser({ field: "email", value: target.value })} />
        <input onChange={({ target }) => dispatchToUser({ field: "password", value: target.value })} />
        <input onChange={({ target }) => dispatchToUser({ field: "roleId", value: target.value })} />
        <button onClick={() => registerNewUser(user)}>Register me</button>
        
        <Outlet />
    </>
}
export default Register;