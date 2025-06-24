import { useContext, useEffect, useState } from "react";
import { apiContext } from "../../contexts/api-context";
import { useSaveUserDetails } from "../../hooks/save-user-details";
import { useFormHandler } from "../../hooks/form-handler";
import { useWakeServer } from "../../hooks/wake-server";

const Login = () => {
    const { url } = useContext(apiContext);
    const { saveUserDetails } = useSaveUserDetails();
    const { handleSubmit } = useFormHandler();
    const { } = useWakeServer();
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

    return <>
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        autoComplete="on"
                        type="email"
                        value={email}
                        id="email"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        autoComplete="on"
                        type="password"
                        value={password}
                        id="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <button disabled={isButtonDisabled} onClick={loginUser}>
                    Login
                </button>
            </form>
            <div className="description">
                <h2>Welcome to Muganim</h2>
                <p>Muganim allows users to upload files securely.
                    All files are encrypted during the upload process to ensure your data remains private and protected.
                    Once your files are uploaded, you can easily share them with other users.
                    The recipients will receive an email containing the password needed to decrypt the files, ensuring that only authorized users can access the content.
                </p>
            </div>
        </div>
    </>
}

export default Login;