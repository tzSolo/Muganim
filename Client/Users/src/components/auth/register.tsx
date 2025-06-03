import { useContext, useEffect, useReducer, useState } from "react";
import { UserPost } from "../../models/user.post";
import { apiContext } from "../../contexts/api-context";
import { useSaveUserDetails } from "../../hooks/save-user-details";

const Register = () => {
    const { url } = useContext(apiContext);
    const [rolesList, setRolesList] = useState<any[]>([]);
    const { saveUserDetails } = useSaveUserDetails();
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

    const registerNewUser = async (userPost: UserPost) => {
        try {
            const response = await fetch(`${url}/api/Users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userPost)
            });
            const { token, user } = await response.json();
            saveUserDetails({ token, user, state: "logged in" });
        }
        catch (error) {
            console.error('Register user failed.', error);
        }
    };

    type ChangedField = { field: "name" | "email" | "password" | "roleId", value: string };

    const changeUserDetails = (user: UserPost, changed: ChangedField): UserPost => {
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

    const initialUser: UserPost = {
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
    </>
}
export default Register;