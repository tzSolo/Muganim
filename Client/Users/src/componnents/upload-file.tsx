import { useContext, useState } from "react";
import { readFile } from "./read-from-file";
import { apiContext } from "./api-context";
import { userContext } from "./user-context";


const UploadFileToAWS = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const { url } = useContext(apiContext);
    const { userState } = useContext(userContext);

    const uploadFile = async () => {
        if (files) {
            const name = files[0].name;
            const content = readFile(files[0]);

            try {
                const response = await fetch(`${url}/api/Files`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userState.token}`
                    },
                    body: JSON.stringify({ name, content, sharedWith: [] })
                });

                const result = await response.json();
                return result;
            }
            catch (error: any) {
                console.error(error);
            }
        }
    }

    return <>
        <input type="file" onChange={({ target }) => setFiles(target.files)} />
        <button onClick={uploadFile}>Upload File</button>
    </>
}
export default UploadFileToAWS;