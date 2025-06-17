export interface UserPost {
    name: string,
    email: string,
    password: string,
    roleId: string
}

export const initialUser: UserPost = {
    name: "",
    email: "",
    password: "",
    roleId: ""
};