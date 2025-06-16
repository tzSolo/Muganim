import { ReactElement, useContext } from "react";
import { popupContext } from "../../contexts/popup-context";

const CenterPopup = ({ children }: { children: ReactElement }) => {

    const { hidePopup } = useContext(popupContext);

    return <>
        <div className="overlay">
            <div className="popup">
                {children}
                <button onClick={() => hidePopup()}>Close</button>
            </div>
        </div>
    </>
}
export default CenterPopup;