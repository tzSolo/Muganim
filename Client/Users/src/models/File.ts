import { User } from "./user";

export interface File {
    id: number,
    name: string,
    content: string,
    sharedWith: User[],
    createdBy: number
}