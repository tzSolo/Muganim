import { File } from "./File";

export interface User {
    id: number,
    name: string,
    password: string,
    email: string,
    sharedFiles: File[],
    accessPermissions: string,
    files: number[],
    createdAt: Date,
    createdBy: string,
    updatedAt: Date | null,
    updatedBy: string | null
};