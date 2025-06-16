import { useContext } from "react";
import { File } from "../../models/File";
import CenterPopup from "../popups/center-popup";
import OriginalFile from "./original-file";
import { popupContext } from "../../contexts/popup-context";

const FilesList = ({ title, subTitle, files }: { title: string, subTitle: string, files: File[] }) => {
    const { openPopupId, showPopup } = useContext(popupContext);

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
                            <CenterPopup>
                                <OriginalFile {...{ fileID: file.id }} />
                            </CenterPopup> :
                            <button onClick={() => showPopup(file.id)}>Display Original File</button>
                        }

                    </li>
                ))}
            </ul>
        }
    </>
}
export default FilesList;