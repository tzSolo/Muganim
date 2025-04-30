import { createContext, ReactElement, useState } from "react";
type User = {
    Id: number,
    Name: string,
    Password: string,
    Email: string,
    AccessPermissions: string,
    CreatedAt: Date,
    CreatedBy: string,
    UpdatedAt: Date | null,
    UpdatedBy: string | null,
};
type FullUser = {
    user: User,
    state: string
    setState: Function,
    setUser: Function
};

const initalUser: User = {
    Id: 1,
    Name: "user name",
    Password: "password",
    Email: "user1@gmail.com",
    AccessPermissions: "",
    CreatedAt: new Date(),
    CreatedBy: "tzivi",
    UpdatedAt: new Date(),
    UpdatedBy: "tzivi"
};
const initalFullUser: FullUser = {
    user: initalUser,
    state: "not logged in",
    setState: () => { },
    setUser: () => { }
};

export const userContext = createContext<FullUser>(initalFullUser);

const UserProvider = ({ children }: { children: ReactElement[] }) => {
    const [user, setUser] = useState<User>(initalUser);
    const [state, setState] = useState<"logged in" | "not logged in">("not logged in");
    return <userContext.Provider value={{ user, state, setState, setUser }}>
        {children}
    </userContext.Provider>
}
export default UserProvider;