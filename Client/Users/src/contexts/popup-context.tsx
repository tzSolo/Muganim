import { createContext, ReactElement, useState } from "react";
type Popup = {
    openPopupId: number,
    showPopup: Function,
    hidePopup: Function
}

const initPopup: Popup = {
    openPopupId: 0,
    showPopup: () => { },
    hidePopup: () => { }
}

export const popupContext = createContext<Popup>(initPopup);

const PopupProvider = ({ children }: { children: ReactElement }) => {
    const [openPopupId, setOpenPopupId] = useState<number>(0);

    const showPopup = (id: number) => {
        setOpenPopupId(id);
    };
    const hidePopup = () => {
        setOpenPopupId(0);
    };

    return <popupContext.Provider value={{ openPopupId, showPopup, hidePopup }}>
        {children}
    </popupContext.Provider>
}
export default PopupProvider;