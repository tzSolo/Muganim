import { useContext, useEffect, useState } from "react";
import { apiContext } from "../contexts/api-context";
import { userContext } from "../contexts/user-context";
import { File } from "../models/File";

const MyFiles = () => {
    const { user } = useContext(userContext);
    const { url } = useContext(apiContext);
    const [files, setFiles] = useState<File[]>([]);

    const getAllUserFilesAsync = async () => {
        try {
            const response = await fetch(`${url}/api/Files`);
            if (!response.ok) {
                throw new Error(`Error, status code : ${response.status}`)
            }
            const data: File[] = await response.json();
            const userFiles = data.filter(file => file.createdBy == user.id);
            setFiles(userFiles);
        }
        catch (error: any) {
            console.error(error);
        }
    }
    useEffect(() => {
        const getAllUserFiles = async () => {
            await getAllUserFilesAsync();
        }

        getAllUserFiles();
    }, []);

    return <>
        <h2>Files Created By You</h2>
        {files.length === 0 ? (
            <p>No files were created by you.</p>
        ) : (
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <p>{file.name}</p>
                        <p>{file.content}</p>
                    </li>
                ))}
            </ul>
        )}
    </>
}
export default MyFiles;