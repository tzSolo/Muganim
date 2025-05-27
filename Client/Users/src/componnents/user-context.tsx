import { createContext, ReactElement, useState } from "react";
import { User } from "../models/user";

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
    id: 1,
    name: "user name",
    password: "password",
    email: "user1@gmail.com",
    files: [],
    accessPermissions: "",
    createdAt: new Date(),
    createdBy: "tzivi",
    updatedAt: new Date(),
    updatedBy: "tzivi"
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