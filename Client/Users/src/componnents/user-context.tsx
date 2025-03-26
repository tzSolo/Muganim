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
    UpdatedBy: string | null
};
type FullUser = {
    user: User,
    setUser: Function
};

const initalUser: User = {
    Id: 1,
    Name: "user name",
    Password: "password",
    Email: "user1@gmail.com",
    AccessPermissions: "",
    CreatedAt: new Date(2025, 1, 1),
    CreatedBy: "tzivi",
    UpdatedAt: null,
    UpdatedBy: null
};
const initalFullUser: FullUser = {
    user: initalUser,
    setUser: () => { }
};

export const userContext = createContext<FullUser>(initalFullUser);

const UserProvider = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<User>(initalUser);

    return <userContext.Provider value={{ user, setUser }}>
        {children}
    </userContext.Provider>
}
export default UserProvider;