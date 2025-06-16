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
        <div className="auth-container">
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        onChange={({ target }) => dispatchToUser({ field: "name", value: target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        onChange={({ target }) => dispatchToUser({ field: "email", value: target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="role">Role</label>
                    <input
                        id="role"
                        list="roles"
                        onChange={({ target }) => dispatchToUser({ field: "roleId", value: target.value })}
                    />
                    <datalist id="roles">
                        {
                            rolesList.map((role) => (
                                <option key={role.id} value={role.name} />
                            ))
                        }
                    </datalist>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        onChange={({ target }) => dispatchToUser({ field: "password", value: target.value })}
                    />
                </div>

                <button disabled={isButtonDisabled} onClick={() => registerNewUser(user)}>Register me</button>
            </form>
            <div className="description">
                <h2>Create Your <span>Muganim Account</span></h2>
                <p>
                    Join Muganim to start sharing files securely!
                    By registering, you’ll be able to upload files to AWS with encryption, ensuring your data is kept safe.
                    Once your files are uploaded, you can share them with others, and they will receive a password via email to access the files.
                    Sign up now to enjoy secure file sharing!
                </p>
            </div>
        </div>
    </>
}
export default Register;