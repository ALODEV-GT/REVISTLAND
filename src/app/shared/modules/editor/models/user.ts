export interface Profile {
    id: number;
    firstname: string;
    lastname: string;
    hobbies: string;
    description: string;
    interestsTopics: string;
    profilePicture: string,
    user: User;
    role: Role
}

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Role {
    id: number,
    name: "USER"
}
