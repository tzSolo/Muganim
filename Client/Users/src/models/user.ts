import { File } from "./File";

export interface User {
    id: number,
    name: string,
    password: string,
    email: string,
    files: File[],
    accessPermissions: string,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date | null,
    updatedBy: string | null
};