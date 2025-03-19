export interface Login {
    email: string;
    password: string;
}

export interface Register {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    roleId:number;
}

export interface Confirmation {
    email: string,
    code: string
}

export interface Recover {
    email: string,
    code: string,
    password: string
}

export interface UserCurrent{
    token:string;
    email: string;
    roleName:string;
}