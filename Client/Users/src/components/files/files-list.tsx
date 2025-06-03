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
                        <p>{file.content}</p>
                        <OriginalFile {...{ fileID: file.id }} />
                    </li>
                ))}
            </ul>
        )}
    </>
}
export default FilesList;