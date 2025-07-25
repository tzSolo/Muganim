import { useContext, useEffect, useState } from "react";
import { apiContext } from "../../contexts/api-context";
import { userContext } from "../../contexts/user-context";
import { useFormHandler } from "../../hooks/form-handler";
import { User } from "../../models/user";


const UploadFileToAWS = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [sharedWithIds, setSharedWithIds] = useState<number[]>([]);
    const { url } = useContext(apiContext);
    const { userState } = useContext(userContext);
    const { handleSubmit } = useFormHandler()

    const uploadFile = async () => {
        if (files) {
            const name = files[0].name;
            const content = await files[0].text();

            try {
                const response = await fetch(`${url}/api/Files`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userState.token}`
                    },
                    body: JSON.stringify({ name, content, sharedWithIds })
                });
                if (!response.ok) {
                    throw new Error(`Error, status code : ${response.status}`);
                }
                const result = await response.json();
                return result;
            }
            catch (error: any) {
                console.error(error);
            }
        }
    };

    const getAllUsersAsync = async () => {
        try {
            const response = await fetch(`${url}/api/Users`);
            if (!response.ok) {
                throw new Error(`Error ,status code : ${response.status}.`);
            }
            const data = await response.json();
            setAllUsers(data);
        }
        catch (error: any) {
            console.error(error);
        }
    };

    const handleAddUser = () => {
        const existUser = allUsers.find(u => u.email === email);

        if (existUser) {
            setSharedWithIds([...sharedWithIds, existUser.id]);
            setEmail("");
            setMessage("User added successfully.");
        }
        else {
            setMessage("Email isn't valid.");
        }
    };

    useEffect(() => {
        const getAllUsers = async () => {
            await getAllUsersAsync();
        }

        getAllUsers();
    }, []);

    return <>
        <h2>Upload File</h2>
        <form className="upload-file-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="file-upload" className="custom-upload-file">Choose File</label>
                <input
                    id="file-upload"
                    type="file"
                    onChange={({ target }) => setFiles(target.files)}
                />
                {files && <small>{files[0].name}</small>}
            </div>
            <div>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter email to share"
                    onChange={({ target }) => setEmail(target.value)}
                />
                <button onClick={handleAddUser}>Add User</button>
                <small>{message}</small>
            </div>

            <button onClick={uploadFile}>Upload File</button>
        </form>
    </>
}
export default UploadFileToAWS;