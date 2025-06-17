import { useContext } from "react";
import { userContext } from "../contexts/user-context";

const Home = () => {
    const { user } = useContext(userContext);
    return <>
        <div className="home-container"> 
            <h2>Hello, {user.name}!</h2>
            <p>Your secure file-sharing platform is ready.
                Easily upload, encrypt, and share files with peace of mind.
            </p>
            <ul>
                <li>🔐 Files are encrypted before upload to protect your data.</li>
                <li>📬 Only recipients with the correct password (sent via email) can view the content.</li>
                <li> 📁 Manage your own files and view files shared with you.</li>
            </ul>
            <p>👉 Use the navigation bar above to start uploading, view your files, or check shared content.</p>
        </div>
    </>
}
export default Home;