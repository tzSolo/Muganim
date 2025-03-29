import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { apiContext } from "./api-context";

//קומפוננטה שמטפלת בכניסה של משתמש רשום למערכת
const Login = () => {
    const { url } = useContext(apiContext);
    const [rolesList, setRolesList] = useState<any[]>([]);

    const getListOfRoles = async () => {
        try {
            const rolesData = await fetch(`${url}/api/Roles`);
            const roles = await rolesData.json();
            setRolesList(roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    }

    const loginUser = (userDetails: { email: string, password: string }) => {
        console.log(userDetails);
        axios.post(`${url}/api/Login`, userDetails)
            .then()//אם הצלחנו - כניסה - כלומר ניתוב למסך הבא
            .catch((err) => console.error("login failed ", err));
    }

    useEffect(() => {
        getListOfRoles();
    }, []);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return <>
        <input ref={emailRef} placeholder="email" />
        <input ref={passwordRef} placeholder="password" />
        <input list="roles" placeholder="role" />
        <datalist id="roles">
            {rolesList.map((role) => <option key={role.id} value={role.name} />)}
        </datalist>
        <button onClick={() => loginUser({ email: emailRef.current?.value ?? "", password: passwordRef.current?.value ?? "" })}>login</button>
    </>
}
export default Login;