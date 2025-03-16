export interface Login {
    email: string;
    password: string;
}

export interface Register {
    firstname: string,
    lastname: string,
    email: string,
    password: string
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