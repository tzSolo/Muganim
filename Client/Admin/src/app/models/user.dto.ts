export class User {
    constructor(
        public id: number,
        public name: string,
        public password: string,
        public email: string,
        public roleId: number,
        public createdAt: Date,
        public createdBy: string,
        public updatedAt: Date,
        public updatedBy: string
    ) { }
}