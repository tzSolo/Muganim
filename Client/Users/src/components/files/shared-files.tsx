import { useContext, useEffect, useState } from "react";
import { File } from "../../models/File";
import { userContext } from "../../contexts/user-context";
import FilesList from "./files-list";
import { apiContext } from "../../contexts/api-context";

const SharedFiles = () => {
    const { user } = useContext(userContext);
    const { url } = useContext(apiContext);
    const [files, setFiles] = useState<File[]>([]);

    const getAllSharedWithFiles = async () => {
        try {
            const response = await fetch(`${url}/api/Files`);
            if (!response.ok) {
                throw new Error(`Error, status code : ${response.status}`)
            }
            const data: File[] = await response.json();
            const userFiles = data.filter(file => file.sharedWithIds.includes(user.id));
            setFiles(userFiles);
        }
        catch (error: any) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllSharedWithFiles();
    }, []);

    return <>
        <FilesList {...{
            title: "Files Shared With You",
            subTitle: "No files have been shared with you.",
            files
        }} />
    </>
}
export default SharedFiles;