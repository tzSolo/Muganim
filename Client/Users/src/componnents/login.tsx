import axios from "axios";
import { useContext, useRef } from "react";
import { apiContext } from "./api-context";

//קומפוננטה שמטפלת בכניסה של משתמש רשום למערכת
const Login = () => {
    const { url } = useContext(apiContext);

    const loginUser = (userDetails: { email: string, password: string }) => {
        console.log(userDetails);
        axios.post(`${url}/api/Login`, userDetails)
            .then()//אם הצלחנו - כניסה - כלומר ניתוב למסך הבא
            .catch((err) => console.error("login failed ", err));
    }

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return <>
        <input ref={emailRef} placeholder="Email" />
        <input ref={passwordRef} placeholder="Password" />
        <button onClick={() => loginUser({ email: emailRef.current?.value ?? "", password: passwordRef.current?.value ?? "" })}>login</button>
    </>
}
export default Login;