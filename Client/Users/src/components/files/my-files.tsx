import { useContext, useEffect, useState } from "react";
import { apiContext } from "../../contexts/api-context";
import { userContext } from "../../contexts/user-context";
import { File } from "../../models/File";
import FilesList from "./files-list";
import CenterPopup from "../popups/center-popup";

const MyFiles = () => {
    const { user } = useContext(userContext);
    const { url } = useContext(apiContext);
    const [files, setFiles] = useState<File[]>([]);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

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

    const hidePopup = () => {
        setIsOpenPopup(false);
    }

    const deleteFileAsync = async (id: number) => {
        setIsOpenPopup(true);
        
        const response = await fetch(`${url}/api/Files/${id}`);
        if (!response.ok) {
            console.error(`Error, status code : ${response.status}`);
        }
    }

    useEffect(() => {
        const getAllUserFiles = async () => {
            await getAllUserFilesAsync();
        }

        getAllUserFiles();
    }, []);

    return <>
        <FilesList {...{
            title: "Files Created By You",
            subTitle: "No files were created by you.",
            files,
            onDeleteFile: deleteFileAsync
        }} />

        {isOpenPopup && <CenterPopup {...{ hidePopup }}>
            <>
                <div>Do you sure you want delete file ?</div>
            </>
        </CenterPopup>}
    </>
}
export default MyFiles;