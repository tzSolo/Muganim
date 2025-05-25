import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { apiContext } from "./api-context";
import { useNavigate } from "react-router-dom";
import { userContext } from "./user-context";

//קומפוננטה שמטפלת בכניסה של משתמש רשום למערכת
const Login = () => {
    const { url } = useContext(apiContext);
    const { setUserState } = useContext(userContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(!email || !password);
    }, [email, password]);

    const loginUser = () => {
        const userDetails = { email, password };
        axios.post(`${url}/api/Auth/login`, userDetails)
            .then(({ data }) => {
                sessionStorage.setItem("token", data.token);
                setUserState({ state: "logged in" });
                navigate("/home");
            })
            .catch((err) => console.error("login failed ", err));
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