import { useContext, useEffect, useReducer, useState } from "react";
import { apiContext } from "./api-context";
import { User } from "../models/user";
import { Outlet, useNavigate } from "react-router-dom";

//קומפוננטה שרושמת משתמש חדש למערכת
const Register = () => {
    const navigate = useNavigate();
    const { url } = useContext(apiContext);
    const [rolesList, setRolesList] = useState<any[]>([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const getListOfRoles = async () => {
        try {
            const rolesData = await fetch(`${url}/api/Roles`);
            const roles = await rolesData.json();
            setRolesList(roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    }

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

    type ChangedField = { field: "name" | "email" | "password" | "roleId", value: string };

    const changeUserDetails = (user: User, changed: ChangedField): User => {
        if (changed.field == "roleId") {
            rolesList.map(role => {
                if (role.name == changed.value)
                    changed.value = role.id;
            })
        }
        if (user.name != "" && user.email != "" && user.password != "" && user.roleId != "")
            setIsButtonDisabled(false)
        return { ...user, [changed.field]: changed.value }
    };

    const initialUser: User = {
        name: "",
        email: "",
        password: "",
        roleId: ""
    };

    useEffect(() => {
        getListOfRoles();
    }, []);

    const [user, dispatchToUser] = useReducer(changeUserDetails, initialUser);
    return <>
        <input placeholder="Name" onChange={({ target }) => dispatchToUser({ field: "name", value: target.value })} />
        <input placeholder="Email" onChange={({ target }) => dispatchToUser({ field: "email", value: target.value })} />
        <input placeholder="Role" list="roles" onChange={({ target }) => dispatchToUser({ field: "roleId", value: target.value })} />
        <datalist id="roles">
            {
                rolesList.map((role) => (
                    <option key={role.id} value={role.name} />
                ))
            }
        </datalist>
        <input placeholder="Password" onChange={({ target }) => dispatchToUser({ field: "password", value: target.value })} />
        <button disabled={isButtonDisabled} onClick={() => registerNewUser(user)}>Register me</button>

        <Outlet />
    </>
}
export default Register;