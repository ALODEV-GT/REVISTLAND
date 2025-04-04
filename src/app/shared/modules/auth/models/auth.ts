export interface Login {
    email: string
    password: string
}

export interface Register {
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    roleId: number
}

export interface Confirmation {
    email: string
    code: string
}

export interface Recover {
    email: string
    code: string
    password: string
}
export interface Session {
    token: string
    id: number
    username: string
    email: string
    profilePicture: string
    isDeleted: boolean
    roleName: Rol
    firstname: string
    lastname: string
}

export enum Rol {
    EDITOR = "EDITOR",
    ADMIN = "ADMIN",
    USER = "USER",
    ANNOUNCER = "ANNOUNCER"
}