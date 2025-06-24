import { ReactElement } from "react";

const CenterPopup = ({ children, hidePopup }: { children: ReactElement, hidePopup: Function }) => {

    return <>
        <div className="overlay">
            <div className="popup">
                <span className="close">&times;</span>
                {children}
                <button onClick={() => hidePopup()}>Close</button>
            </div>
        </div>
    </>
}
export default CenterPopup;