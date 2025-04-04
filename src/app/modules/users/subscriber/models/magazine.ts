export interface MagazineItem {
    id: number
    title: string
    description: string
    category: Category
    editor: Editor
    likeCount: number
    disableLikes: boolean
    disableComments: boolean
    disableSuscriptions: boolean
    adBlockingExpirationDate?: string
}

export interface Category {
    id: number
    name: string
    description: string
    createdAt: Date
    updatedAt: null
}

export interface Editor {
    id: number
    username: string
    profile: Profile
}

export interface Profile {
    id: number
    firstName: string
    lastName: string
}

export interface Comment {
    id: number;
    user: Editor;
    content: string;
    createdAt: Date;
    timeAgo?: string
}
