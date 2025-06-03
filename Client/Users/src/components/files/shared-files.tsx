import { useContext, useEffect, useState } from "react";
import { File } from "../../models/File";
import { userContext } from "../../contexts/user-context";
import FilesList from "./files-list";

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
        <FilesList {...{
            title: "Files Shared With You",
            subTitle: "No files have been shared with you.",
            files
        }} />
    </>
}
export default SharedFiles;