import { Link, Outlet } from "react-router-dom";

const MyWorkspace = () => {
    return <>
        <Link to={"/my-files"}>My files</Link>
        <span> | </span>
        <Link to={"/shared-with-me"}>Shared files</Link>
        <span> | </span>
        <Link to={"/another"}>Another</Link>
        <br />
        <Outlet />
    </>
}
export default MyWorkspace;