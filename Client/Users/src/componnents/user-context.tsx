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
    userState: UserState
    setUserState: Function,
    setUser: Function
};
type UserState = {
    state: "logged in" | "not logged in",
    token?: string
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
    userState: { state: "not logged in" },
    setUserState: () => { },
    setUser: () => { }
};

export const userContext = createContext<FullUser>(initalFullUser);

const UserProvider = ({ children }: { children: ReactElement[] }) => {
    const [user, setUser] = useState<User>(initalUser);
    const [userState, setUserState] = useState<UserState>({ state: "not logged in" });

    return <userContext.Provider value={{ user, userState, setUserState, setUser }}>
        {children}
    </userContext.Provider>
}
export default UserProvider;