export class User {
    constructor(
        public username?: string,
        public email?: string,
        public pass1?: string,
        public nombre?: string,
        public avatar?: string,
        public id?: number
    ) {}

    convertToUser( user: any ) {
        this.username = user.username ? user.username : null;
        this.email = user.email ? user.email : null;
        this.pass1 = user.pass1 ? user.pass1 : null;
        this.nombre = user.nombre ? user.nombre : null;
        this.avatar = user.avatar ? user.avatar : null;
        this.id = user.id ? user.id : null;
        
        return this;
    }
}