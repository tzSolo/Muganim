import { Link } from "react-router-dom";

const MyWorkspace = () => {
    return <>
        <li>
            <Link to={"/home"}>Home</Link>
        </li>
        <li>
            <Link to={"/my-files"}>My files</Link>
        </li>
        <li>
            <Link to={"/shared-with-me"}>Shared files</Link>
        </li>
        <li>
            <Link to={"/upload"}>Upload File</Link>
        </li>
        <li>
            <Link to={"/logout"}>Log Out</Link>
        </li>
    </>
}
export default MyWorkspace;