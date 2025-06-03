import { useContext, useEffect, useState } from "react";
import { File } from "../models/File";
import { userContext } from "../contexts/user-context";
import OriginalFile from "./original-file";

const SharedFiles = () => {
    const { user } = useContext(userContext);
    const [files, setFiles] = useState<File[]>([]);

    const getAllSharedWithFiles = () => {
        if (user.sharedFiles) {
            setFiles(user.sharedFiles);
        }
    }

    useEffect(() => {
        getAllSharedWithFiles();
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