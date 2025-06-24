import { File } from "../../models/File";
import CenterPopup from "../popups/center-popup";
import OriginalFile from "./original-file";
import { usePopup } from "../../hooks/popup";

type FilesListProp = {
    title: string,
    subTitle: string,
    files: File[],
    onDeleteFile?: Function
}

const FilesList = ({ title, subTitle, files, onDeleteFile }: FilesListProp) => {
    const { openPopupId, showPopup, hidePopup } = usePopup();

    return <>
        <h2>{title}</h2>
        {files.length === 0 ?
            <p>{subTitle}</p>
            :
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <p>{file.name}</p>
                        <div className="file">
                            <p>{file.content}</p>
                        </div>
                        {openPopupId === file.id ?
                            <CenterPopup {...{ hidePopup }}>
                                <OriginalFile {...{ fileID: file.id }} />
                            </CenterPopup> :
                            <button onClick={() => showPopup(file.id)}>Display Original File</button>
                        }
                        {onDeleteFile && <button onClick={() => onDeleteFile(file.id)}>Delete</button>}
                    </li>
                ))}
            </ul>
        }
    </>
}
export default FilesList;