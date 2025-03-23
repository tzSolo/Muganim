export class User {
    constructor(
        public id: number,
        public name: string,
        public password: string,
        public email: string,
        public accessPermissions: string,
        public createdAt: Date,
        public createdBy: string,
        public updatedAt: Date,
        public updatedBy: string
    ) { }
}