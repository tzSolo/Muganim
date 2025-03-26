import { createContext, ReactElement } from "react";

export const apiContext = createContext<{ url: string }>({ url: "http://localhost:5208" });

//קומפוננטה שתפקידה לעטוף את כל שאר הקומפוננטות 
//ולספק להן את הכתובת הבסיסית של השרת
const APIProvider = ({ children }: { children: ReactElement }) => {
    return <apiContext.Provider value={{ url: "https://server-muganim.onrender.com" }}>
        {children}
    </apiContext.Provider>
}
export default APIProvider;