import { useContext, useEffect, useState } from "react";
import { File } from "../models/File";
import { userContext } from "../contexts/user-context";
import { apiContext } from "../contexts/api-context";
import OriginalFile from "./original-file";

const SharedFiles = () => {
    const { user } = useContext(userContext);
    const { url } = useContext(apiContext);
    const [files, setFiles] = useState<File[]>([]);

    const getAllSharedWithFiles = async () => {
        try {
            const response = await fetch(`${url}/api/Users/${user.id}`);
            if (response.ok) {
                const data = await response.json();
                setFiles(data.files);
            }
        }
        catch (error: any) {
            console.error(error);
        }
    }
    useEffect(() => {
        const getAllSharedWithFilesAsync = async () => {
            await getAllSharedWithFiles();
        }

        getAllSharedWithFilesAsync();
    }, []);

    return <>
        <h2>Files Shared With You</h2>
        {files.length === 0 ? (
            <p>No files have been shared with you.</p>
        ) : (
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <p>{file.name}</p>
                        <OriginalFile {...{ fileID: file.id }} />
                    </li>
                ))}
            </ul>
        )}
    </>
}
export default SharedFiles;