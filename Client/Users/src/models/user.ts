export interface User {
    id: number,
    name: string,
    email: string,
    sharedFiles: number[],
    accessPermissions: string,
    files: number[],
    createdAt: Date,
    createdBy: string,
    updatedAt: Date | null,
    updatedBy: string | null
};

export const initalUser: User = {
    id: 1,
    name: "user name",
    email: "user1@gmail.com",
    files: [],
    sharedFiles: [],
    accessPermissions: "",
    createdAt: new Date(),
    createdBy: "tzivi",
    updatedAt: new Date(),
    updatedBy: "tzivi"
};