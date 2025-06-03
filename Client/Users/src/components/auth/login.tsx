import { useContext, useEffect, useState } from "react";
import { apiContext } from "../../contexts/api-context";
import { useSaveUserDetails } from "../../hooks/save-user-details";

const Login = () => {
    const { url } = useContext(apiContext);
    const { saveUserDetails } = useSaveUserDetails();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(!email || !password);
    }, [email, password]);

    const loginUser = async () => {
        const userDetails = { email, password };
        try {
            const response = await fetch(`${url}/api/Auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails)
            });
            if (!response.ok) {
                throw new Error(`Error, status code : ${response.status}`);
            }
            const { token, user } = await response.json();
            saveUserDetails({ token, user, state: "logged in" });
        }
        catch (err: any) {
            console.error("login failed ", err);
        }
    }

    return (
        <>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            <button disabled={isButtonDisabled} onClick={loginUser}>
                Login
            </button>
        </>
    );
}

export default Login;