import { File } from "../../models/File";
import OriginalFile from "./original-file";

const FilesList = ({ title, subTitle, files }: { title: string, subTitle: string, files: File[] }) => {
    return <>
        <h2>{title}</h2>
        {files.length === 0 ? (
            <p>{subTitle}</p>
        ) : (
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <p>{file.name}</p>
                        <div className="file">
                            <p>{file.content}</p>
                        </div>
                        <OriginalFile {...{ fileID: file.id }} />
                    </li>
                ))}
            </ul>
        )}
    </>
}
export default FilesList;