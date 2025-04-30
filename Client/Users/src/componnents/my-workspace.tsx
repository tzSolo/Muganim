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
            <Link to={"/another"}>Another</Link>
        </li>
    </>
}
export default MyWorkspace;