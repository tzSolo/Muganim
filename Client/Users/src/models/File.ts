export interface File {
    id: number,
    name: string,
    content: string,
    sharedWithIds: number[],
    createdBy: number
}