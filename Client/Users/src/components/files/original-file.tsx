import { useContext, useState } from "react"
import { apiContext } from "../../contexts/api-context"
import { userContext } from "../../contexts/user-context";
import { File } from "../../models/File";

const OriginalFile = ({ fileID }: { fileID: number }) => {
    const [passwords, setPasswords] = useState<string[]>([]);
    const [file, setFile] = useState<File>();
    const { url } = useContext(apiContext);
    const { userState } = useContext(userContext);

    const decryptContentFileAsync = async () => {
        try {
            const response = await fetch(`${url}/api/Files/${fileID}`, {
                method: "Get",
                headers: {
                    'Authorization': `Bearer ${userState.token}`,
                    'Password1': passwords[0],
                    'Password2': passwords[1]
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFile(data);
            }
        }
        catch (error: any) {
            console.error(error);
        }
    }
    const decryptContentFile = async () => {
        await decryptContentFileAsync();
    }
    return <>
        <input type="password" placeholder="password1" onChange={({ target }) => setPasswords([target.value, passwords[1]])} />
        <input type="password" placeholder="password2" onChange={({ target }) => setPasswords([passwords[0], target.value])} />
        <button onClick={decryptContentFile}>Decrypt file</button>
        
        {file?.content}
    </>
}
export default OriginalFile;