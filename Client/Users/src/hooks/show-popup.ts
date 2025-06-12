import { useState } from "react";

export const useShowPopup = () => {
    const [openPopupId, setOpenPopupId] = useState<number>(0);

    const showPopup = (id: number) => {
        setOpenPopupId(id);
    };
    const hidePopup = () => {
        setOpenPopupId(0);
    };
    return { openPopupId, showPopup, hidePopup };
}