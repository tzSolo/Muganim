import { ReactElement } from "react";
import { useShowPopup } from "../../hooks/show-popup";

const CenterPopup = ({ children }: { children: ReactElement }) => {
    
    const { hidePopup } = useShowPopup();

    return <>
        <div className="popup">
            {children}
            <button onClick={hidePopup}>Close</button>
        </div>
    </>
}
export default CenterPopup;