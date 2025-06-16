import { ReactElement } from "react";

const MainContainer = ({ children }: { children: ReactElement }) => {
    return <main className="container">
        {children}
    </main>
}
export default MainContainer;